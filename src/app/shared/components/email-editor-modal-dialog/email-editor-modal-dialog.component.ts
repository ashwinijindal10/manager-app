import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete,
  MatDialog
} from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProspectEmailDetail } from '../../model/email/prospect-email-detail';
import { EmailData } from '../../model/email/email-data';
import { EmailService } from '../../services/email/email.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AlertService } from '../../services/alert.service';
import { SpinnerService } from '../../../shared/components/loader/spinner.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { EmailList } from '../../model/email/email-list';
import { EmailEditorComponent } from '../email-editor/email-editor.component';
import { EmailEditorInput } from '../../model/email/email-editor-input';
import { EmailEditorSourceType } from '../../model/email/email-editor-source-type';
import { EmailDraft } from '../../model/email/email-draft';
import { EmailDataService } from '../../services/email/email-data.service';
import { EmailEditorModalDialogService } from '../../services/email/email-editor-modal-dialog.service';
import { StorageService } from '../../services/storage.service';
import { ProspectDetailsService } from '../../../modules/prospect-details/services/prospect-details.service';
@Component({
  selector: 'app-email-editor-modal-dialog',
  templateUrl: './email-editor-modal-dialog.component.html',
  styleUrls: ['./email-editor-modal-dialog.component.scss']
})
export class EmailEditorModalDialogComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Output() closeEmail = new EventEmitter<string>();
  prospectEmailList: ProspectEmailDetail[];
  @Input() emailEditorInstanceId = '';
  @Input() emailEditorInput: EmailEditorInput;
  @Input() displayName = '';
  EmailEditorSourceType: EmailEditorSourceType;
  minmaxIcon = 'min-email';
  minmaxText = 'Minimize';
  expandshrinkIcon = 'expand';
  minimizeHeight = 'inline-flex';
  fullwindowWidth = '500px';
  fullwindowHeight = '0vh';
  fullwindowMargin = '0';
  minimizeWindow = false;
  expandWindow = false;
  expandWindowPrevious = false;
  showConfirmationDialog = false;

  // fields for Mat Chip list
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  directEmailCtrl = new FormControl();
  @ViewChild('directEmailInput') directEmailInput: ElementRef<HTMLInputElement>;
  @ViewChild('emailSubjectInput') emailSubjectInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild(EmailEditorComponent)
  emailEditorChildComponent: EmailEditorComponent;
  emailForm: FormGroup;
  private subscription: Subscription;
  openedMessageData: string;
  oldSubject: string;

  constructor(
    private emailService: EmailService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private alertService: AlertService,
    private loaderService: SpinnerService,
    private emailDataService: EmailDataService,
    private emailEditorModalDialogService: EmailEditorModalDialogService,
    private storageService: StorageService,
    private prospectDetailService: ProspectDetailsService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      to: [''],
      subject: ['', [Validators.maxLength(120)]]
    });

    if (this.emailEditorInput) {
      this.prospectEmailList = this.utilityService.deepCopy(
        this.emailEditorInput.prospectEmailDetailList
      );
      if (this.emailEditorInput.subject !== null) {
        this.oldSubject = this.utilityService.deepCopy(
          this.emailEditorInput.subject
        );
      } else {
        this.oldSubject = '';
      }

      if (
        this.emailEditorInput.emailEditorSourceType ===
          EmailEditorSourceType.Draft ||
        this.emailEditorInput.emailEditorSourceType ===
          EmailEditorSourceType.Sent
      ) {
        this.emailForm.controls['subject'].setValue(
          this.emailEditorInput.subject
        );
      } else if (
        this.emailEditorInput.emailEditorSourceType ===
        EmailEditorSourceType.Job
      ) {
        this.prospectEmailList = this.emailEditorInput.prospectEmailDetailList;
      }
    }

    this.subscription = this.emailEditorModalDialogService
      .onMaximize()
      .subscribe(emailEditorInstanceId => {
        if (emailEditorInstanceId) {
          if (emailEditorInstanceId !== this.emailEditorInstanceId) {
            if (!this.minimizeWindow) {
              this.minimizeEmail();
            }
          }
        }
      });
    this.emailEditorModalDialogService.maximize(this.emailEditorInstanceId);
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  closeShowEmail() {
    // debugger;
    // console.log(this.directEmailCtrl);
    const emailTextValue = this.emailEditorChildComponent.getEmailMessage();
    if (
      (emailTextValue &&
        emailTextValue.trim() !== '' &&
        emailTextValue !== this.openedMessageData) ||
      (this.oldSubject !== this.emailForm.get('subject').value &&
        this.emailForm.get('subject').dirty) ||
      (this.directEmailCtrl.value &&
        this.directEmailCtrl.value.trim() !== '' &&
        this.directEmailCtrl.dirty) ||
      this.ValidateChangeInProspectList()
    ) {
      this.displayConfirmationDialog();
    } else {
      this.closeDialog();
    }
  }

  // this.emailForm.get('subject').value &&
  //       this.emailForm.get('subject').value.trim() !== '' &&

  ValidateChangeInProspectList() {
    let valid = false;
    if (
      this.prospectEmailList.length !==
      this.emailEditorInput.prospectEmailDetailList.length
    ) {
      valid = true;
    } else {
      let found = false;
      for (let i = 0; i < this.prospectEmailList.length; i++) {
        if (
          this.prospectEmailList[i].primaryEmail !==
          this.emailEditorInput.prospectEmailDetailList[i].primaryEmail
        ) {
          found = true;
        }
        if (found) {
          break;
        }
      }
      if (found) {
        valid = true;
      } else {
        valid = false;
      }
      // this.prospectEmailList.forEach(element => {
      //   const emailid = element.primaryEmail;
      //   let found = false;
      //   this.emailEditorInput.prospectEmailDetailList.forEach(item => {
      //     if (item.primaryEmail === emailid) {
      //       found = true;
      //     }
      //   });
      //   if (!found) {
      //     valid = false;
      //   }
      // });
    }
    return valid;
  }

  ngAfterViewInit() {
    if (
      this.emailEditorInput.emailEditorSourceType ===
        EmailEditorSourceType.Draft ||
      this.emailEditorInput.emailEditorSourceType === EmailEditorSourceType.Sent
    ) {
      this.setContent(this.emailEditorInput.message);
      this.openedMessageData = this.emailEditorChildComponent.getEmailMessage();
    }
  }

  minimizeEmail() {
    this.minimizeWindow = !this.minimizeWindow;
    if (this.minimizeWindow) {
      this.minimizeHeight = 'none';
      this.fullwindowWidth = '350px';
      this.fullwindowHeight = '0vh';
      this.fullwindowMargin = '0';
      this.emailEditorChildComponent.hide();
      this.minmaxIcon = 'max-email';
      this.minmaxText = 'Maximize';
      this.expandWindowPrevious = this.expandWindow;
      this.expandWindow = false;
    } else {
      this.expandWindow = this.expandWindowPrevious;
      // emit event maximize - Notify others to minimize
      this.emailEditorModalDialogService.maximize(this.emailEditorInstanceId);

      if (this.expandWindow) {
        this.fullwindowWidth = '97vw';
        this.fullwindowHeight = '82vh';
        this.fullwindowMargin = '0 3.5% 1% .5%';
        this.minimizeHeight = 'inline-flex';
        this.minmaxIcon = 'min-email';
        this.minmaxText = 'Minimize';
        this.expandshrinkIcon = 'shrink';
        this.emailEditorChildComponent.show();
      } else {
        this.fullwindowWidth = '500px';
        this.fullwindowHeight = 'auto';
        this.fullwindowMargin = '0';
        this.minimizeHeight = 'inline-flex';
        this.minmaxIcon = 'min-email';
        this.minmaxText = 'Minimize';
        this.expandshrinkIcon = 'expand';
        this.emailEditorChildComponent.show();
      }
    }
  }

  expandEmail() {
    if (this.minimizeWindow) {
      this.minimizeWindow = !this.minimizeWindow;
      this.expandWindow = this.expandWindowPrevious;
    }

    if (!this.minimizeWindow) {
      // emit event maximize - Notify others to minimize
      this.emailEditorModalDialogService.maximize(this.emailEditorInstanceId);
    }

    this.expandWindow = !this.expandWindow;
    if (this.expandWindow) {
      this.fullwindowWidth = '97vw';
      this.fullwindowHeight = '82vh';
      this.fullwindowMargin = '0 3.5% 1% .5%';
      this.minimizeHeight = 'inline-flex';
      this.minmaxIcon = 'min-email';
      this.minmaxText = 'Minimize';
      this.expandshrinkIcon = 'shrink';
      this.emailEditorChildComponent.show();
      this.emailEditorChildComponent.resize(null, 140);
    } else {
      this.fullwindowWidth = '500px';
      this.fullwindowHeight = 'auto';
      this.fullwindowMargin = '0';
      this.minimizeHeight = 'inline-flex';
      this.minmaxIcon = 'min-email';
      this.minmaxText = 'Minimize';
      this.expandshrinkIcon = 'expand';
      this.emailEditorChildComponent.show();
      this.emailEditorChildComponent.resize(null, 100);
    }
  }

  // Methods for Mat Chip list
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let invalidEmailText: string = null;
    // Add new email id in email list.
    if ((value || '').trim()) {
      const emailArray = value.split(';');
      const obj = this;
      emailArray.forEach(item => {
        const emaildId = item.trim();
        if (obj.validateEmailFormat(emaildId)) {
          const prospectEmailDetail: ProspectEmailDetail = {
            firstName: '',
            lastName: '',
            primaryEmail: emaildId,
            fullName: emaildId,
            prospectId: ''
          };
          obj.prospectEmailList.push(prospectEmailDetail);
        } else {
          if (invalidEmailText) {
            invalidEmailText = invalidEmailText + ' ' + emaildId;
          } else {
            invalidEmailText = emaildId;
          }
        }
      });

      // Reset the input value
      if (!invalidEmailText) {
        if (input) {
          input.value = '';
        }
        this.directEmailCtrl.setValue(null);
      } else {
        if (input) {
          input.value = invalidEmailText;
        }
        this.directEmailCtrl.setValue(invalidEmailText);
      }
    }
  }

  validateEmailFormat(email: string): boolean {
    let validEmail: boolean;
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    validEmail = EMAIL_REGEXP.test(email);
    return validEmail;
  }

  setContent(message) {
    this.emailEditorChildComponent.setEmailMessage(message);
  }

  remove(item: ProspectEmailDetail): void {
    const index = this.prospectEmailList.indexOf(item);
    if (index >= 0) {
      this.prospectEmailList.splice(index, 1);
    }
  }

  onSave() {
    if (this.validateEmail() && this.validateMessage()) {
      this.saveEmail();
    }
  }

  saveEmail() {
    if (
      this.emailEditorInput.emailEditorSourceType ===
      EmailEditorSourceType.Draft
    ) {
      const postData = this.getDraftData();
      this.loaderService.show();
      this.emailService.updateDraft(postData).subscribe(
        res => {
          // On Success
          this.loaderService.hide();
          if (res && typeof res === 'string') {
            res = JSON.parse(res);
          }
          if (res.state) {
            const sourceType = EmailEditorSourceType.Draft;
            this.emailDataService.refreshView(sourceType);
            this.alertService.success('Email saved successfully!');
            this.closeDialog();
          } else {
            // On Validation Error
            if (res.message.errors.length > 0) {
              this.alertService.error(res.message.errors[0].message);
            }
          }
        },
        err => {
          this.loaderService.hide();
        }
      );
    } else {
      const postData = this.getDraftData();
      this.loaderService.show();
      this.emailService.saveDraft(postData).subscribe(
        res => {
          // On Success
          this.loaderService.hide();
          if (res && typeof res === 'string') {
            res = JSON.parse(res);
          }
          if (res.state) {
            const sourceType = EmailEditorSourceType.Draft;
            this.emailDataService.refreshView(sourceType);
            this.alertService.success('Email saved successfully!');
            this.closeDialog();
          } else {
            // On Validation Error
            if (res.message.errors.length > 0) {
              this.alertService.error(res.message.errors[0].message);
            }
          }
        },
        err => {
          this.loaderService.hide();
        }
      );
    }
  }

  onSend() {
    if (
      this.validateEmail() &&
      this.validateEmailList() &&
      this.validateSubject() &&
      this.validateMessage()
    ) {
      this.sendEmail();
    }
  }

  sendEmail() {
    const postData = this.getEmailData();
    // console.log(postData);
    this.loaderService.show();
    this.emailService.sendEmail(postData).subscribe(
      res => {
        // On Success
        this.loaderService.hide();
        if (res.state) {
          if (
            this.emailEditorInput.emailEditorSourceType ===
              EmailEditorSourceType.Sent ||
            this.emailEditorInput.emailEditorSourceType ===
              EmailEditorSourceType.composeEmail
          ) {
            const sourceTypeSend = EmailEditorSourceType.Sent;
            this.emailDataService.refreshView(sourceTypeSend);
          }
          if (
            this.emailEditorInput.emailEditorSourceType ===
            EmailEditorSourceType.Draft
          ) {
            const sourceTypeDraft = EmailEditorSourceType.Draft;
            this.emailDataService.refreshView(sourceTypeDraft);
          }
          this.alertService.success('Email sent successfully!');
          this.closeDialog();
          if (
            this.emailEditorInput.emailEditorSourceType ===
            EmailEditorSourceType.Job
          ) {
            this.emailDataService.onEmailEditorSuccess.next(true);
          }
          this.prospectDetailService.firstName$.subscribe(response => {
            const prospectId = response;
            if (this.emailEditorInput.emailEditorSourceType === 3) {
              this.prospectDetailService.getProspectActivityDetailsRefresh(
                prospectId
              );
            }
          });
        } else {
          // On Validation Error
          if (res.message.errors.length > 0) {
            // this.alertService.error(res.message.errors[0].message +
            //  " does not exist in the prospect database. Please correct and try again.");
            this.alertService.error(res.message.errors[0].message);
          } else {
            this.alertService.error(
              'Invalid Email address. Please correct and try again.'
            );
          }
        }
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

  validateSubject() {
    if (
      this.emailForm.get('subject').value &&
      this.emailForm.get('subject').value.trim() !== ''
    ) {
      return true;
    } else {
      this.alertService.error(
        'The E-mail subject is mandatory.Please enter subject.',
        'prospect-dialog-alert2'
      );
      this.emailSubjectInput.nativeElement.focus();
      return false;
    }
  }

  validateMessage() {
    const emailTextValue = this.emailEditorChildComponent.getEmailMessage();
    if (emailTextValue && emailTextValue.trim() !== '') {
      return true;
    } else {
      this.emailEditorChildComponent.focus();
      this.alertService.error(
        'The E-mail message is mandatory.Please enter message.',
        'prospect-dialog-alert2'
      );
      return false;
    }
  }

  validateEmail() {
    let invalidEmail = null;
    if (this.directEmailInput && this.directEmailInput.nativeElement.value) {
      invalidEmail = this.directEmailInput.nativeElement.value;
    }
    if (!invalidEmail) {
      return true;
    } else {
      this.directEmailInput.nativeElement.focus();
      this.alertService.error(
        'Invalid E-mail address format ' +
          invalidEmail +
          '. Please enter validate E-Mail Address format.'
      );
      return false;
    }
  }

  validateEmailList() {
    if (this.prospectEmailList.length > 0) {
      return true;
    } else {
      this.directEmailInput.nativeElement.focus();
      this.alertService.error(
        'At least one Email is mandatory. Please enter Email Id.',
        'prospect-dialog-alert2'
      );
      return false;
    }
  }

  getProspectEmails() {
    const emailList = this.prospectEmailList.map(item => {
      const emailDetail: EmailList = {
        email: item.primaryEmail,
        prospectId: item.prospectId
      };
      return emailDetail;
    });
    return emailList;
  }

  getReceipients() {
    const receipientList = this.prospectEmailList.map(item => {
      return item.primaryEmail;
    });
    return receipientList;
  }

  getDraftData() {
    const receipients = this.getReceipients();
    let type = '';
    if (
      this.emailEditorInput.emailEditorSourceType === EmailEditorSourceType.Sent
    ) {
      type = 'Sent';
    } else if (
      this.emailEditorInput.emailEditorSourceType ===
      EmailEditorSourceType.Draft
    ) {
      type = 'Draft';
    } else if (
      this.emailEditorInput.emailEditorSourceType === EmailEditorSourceType.Job
    ) {
      type = 'Job';
    }

    const emailDraft: EmailDraft = {
      id: this.emailEditorInput.id ? this.emailEditorInput.id : '',
      type: type,
      receipients: receipients,
      createdBy: this.storageService.getUserId(),
      modifiedBy: this.storageService.getUserId(),
      createdOn: new Date(),
      modifiedOn: new Date(),
      subject: this.emailForm.get('subject').value,
      body: this.emailEditorChildComponent.getEmailMessage(),
      jobId: this.emailEditorInput.jobId ? this.emailEditorInput.jobId : null
    };
    return emailDraft;
  }

  getEmailData() {
    let type = '';
    if (
      this.emailEditorInput.emailEditorSourceType === EmailEditorSourceType.Sent
    ) {
      type = 'Sent';
    } else if (
      this.emailEditorInput.emailEditorSourceType ===
      EmailEditorSourceType.Draft
    ) {
      type = 'Draft';
    }
    const emailList = this.getProspectEmails();
    // emails = this.removeDuplicate(emails);
    const emailData: EmailData = {
      id: this.emailEditorInput.id ? this.emailEditorInput.id : '',
      type: type,
      emails: emailList,
      subject: this.emailForm.get('subject').value,
      body: this.emailEditorChildComponent.getEmailMessage(),
      jobId: this.emailEditorInput.jobId ? this.emailEditorInput.jobId : null
    };
    return emailData;
  }

  displayConfirmationDialog() {
    this.showConfirmationDialog = true;
  }

  confirmCancel(event) {
    this.showConfirmationDialog = false;
    if (event) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.cleanUp();
    this.closeEmail.emit(this.emailEditorInstanceId);
  }

  removeDuplicate(items: any) {
    items = items.sort();
    const uniqueList = [];
    let currentItem = '';
    for (let i = 0; i < items.length; i++) {
      if (items[i].toLowerCase() !== currentItem.toLowerCase()) {
        currentItem = items[i];
        if (i !== 0) {
          uniqueList.push(currentItem);
        }
      }
      if (i === 0) {
        uniqueList.push(currentItem);
      }
    }
    return uniqueList;
  }

  cleanUp() {
    this.emailEditorChildComponent.cleanUp();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
