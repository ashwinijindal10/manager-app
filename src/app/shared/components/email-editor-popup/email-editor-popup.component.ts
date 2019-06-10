import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete,
  MatDialog
} from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProspectEmailDetail } from '../../model/email/prospect-email-detail';
import { EmailData } from '../../model/email/email-data';
import { EmailService } from '../../services/email/email.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AlertService } from '../../services/alert.service';
import { SpinnerService } from '../../../shared/components/loader/spinner.service';
import { EmailList } from '../../model/email/email-list';
import { EmailEditorInput } from '../../model/email/email-editor-input';
import { EmailEditorSourceType } from '../../model/email/email-editor-source-type';
import { EmailDraft } from '../../model/email/email-draft';
import { EmailDataService } from '../../services/email/email-data.service';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
// import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';

declare var tinymce: any;

@Component({
  selector: 'app-email-editor-popup',
  templateUrl: './email-editor-popup.component.html',
  styleUrls: ['./email-editor-popup.component.scss']
})
export class EmailEditorPopupComponent implements OnInit, OnDestroy {
  @Output() closeEmail = new EventEmitter<boolean>();
  @Input() prospectEmailList: ProspectEmailDetail[];
  @Input() emailEditorInstanceId = '';
  @Input() emailEditorInput: EmailEditorInput;
  EmailEditorSourceType: EmailEditorSourceType;
  minmaxIcon = 'min-email';
  expandshrinkIcon = 'expand';
  minimizeHeight = 'inline-flex';
  fullwindowWidth: any = '50vw';
  fullwindowHeight: any = '0vh';
  fullwindowMargin: any = '0';
  minimizeWindow = false;
  expandWindow = false;

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

  emailForm: FormGroup;
  // Fields for tinymce
  editor;
  template = '';

  constructor(
    private emailService: EmailService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private alertService: AlertService,
    private loaderService: SpinnerService,
    private emailDataService: EmailDataService
  ) {}

  ngOnInit() {
    const selector = 'textarea[id=\'' + this.emailEditorInstanceId + '\']';
    tinymce.init({
      selector: selector,
      // max_height: 110,
      // min_height: 110,
      margin_top: 20,
      menubar: false,
      // plugins: [
      //   'autoresize advlist autolink lists link image charmap print preview anchor textcolor',
      //   'searchreplace visualblocks code fullscreen',
      //   'insertdatetime media table paste code wordcount'
      // ],
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code wordcount'
      ],
      // autoresize_overflow_padding: 50,
      // plugins: [
      //   'image table',
      // ],
      // plugins: [
      //   'advlist autolink lists link image charmap print preview anchor textcolor',
      //   'searchreplace visualblocks code fullscreen',
      //   'insertdatetime media table paste code wordcount'
      // ],
      toolbar: `formatselect | bold italic backcolor |
       alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image | table | undo redo`,
      // toolbar: 'link image | undo redo | formatselect |
      // bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tiny.cloud/css/codepen.min.css'
      ]
    });

    this.emailForm = this.formBuilder.group({
      to: [''],
      subject: ['', [Validators.maxLength(120)]]
    });

    if (this.emailEditorInput) {
      if (
        this.emailEditorInput.emailEditorSourceType ===
        EmailEditorSourceType.composeEmail
      ) {
        this.prospectEmailList = this.emailEditorInput.prospectEmailDetailList;
      } else if (
        this.emailEditorInput.emailEditorSourceType ===
        EmailEditorSourceType.Draft
      ) {
        this.prospectEmailList = this.emailEditorInput.prospectEmailDetailList;
        // this.emailForm.set("subject").value = this.emailEditorInput.subject;
        this.emailForm.controls['subject'].setValue(this.emailEditorInput.subject);
        this.setContent(this.emailEditorInput.message);
      } else if (
        this.emailEditorInput.emailEditorSourceType ===
        EmailEditorSourceType.ProspectList
      ) {
        this.prospectEmailList = this.emailEditorInput.prospectEmailDetailList;
      } else if (
        this.emailEditorInput.emailEditorSourceType ===
        EmailEditorSourceType.ProspectDetail
      ) {
        this.prospectEmailList = this.emailEditorInput.prospectEmailDetailList;
      } else if (
        this.emailEditorInput.emailEditorSourceType ===
        EmailEditorSourceType.Sent
      ) {
        this.prospectEmailList = this.emailEditorInput.prospectEmailDetailList;
      }
    }
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  closeShowEmail() {
    this.confirmCancel();
  }

  minimizeEmail() {
    this.minimizeWindow = !this.minimizeWindow;
    if (this.minimizeWindow) {
      this.minimizeHeight = 'none';
      this.fullwindowWidth = '50vw';
      this.fullwindowHeight = '0vh';
      this.fullwindowMargin = '0';
      tinymce.get(this.emailEditorInstanceId).hide();
      tinymce.DOM.setStyle(this.emailEditorInstanceId, 'display', 'none');
      this.minmaxIcon = 'max-email';
      if (this.expandWindow) {
        this.expandshrinkIcon = 'shrink';
      } else {
        this.expandshrinkIcon = 'expand';
      }
    } else {
      if (this.expandWindow) {
        this.fullwindowWidth = '90vw';
        this.fullwindowHeight = '90vh';
        this.fullwindowMargin = '0 3.5% 2% .5%';
        this.minimizeHeight = 'inline-flex';
        this.minmaxIcon = 'min-email';
        this.expandshrinkIcon = 'shrink';
        tinymce.get(this.emailEditorInstanceId).show();
      } else {
        this.fullwindowWidth = '50vw';
        this.fullwindowHeight = 'auto';
        this.fullwindowMargin = '0';
        this.minimizeHeight = 'inline-flex';
        this.minmaxIcon = 'min-email';
        this.expandshrinkIcon = 'expand';
        tinymce.get(this.emailEditorInstanceId).show();
      }
    }
  }

  expandEmail() {
    this.expandWindow = !this.expandWindow;
    if (this.expandWindow) {
      this.fullwindowWidth = '90vw';
      this.fullwindowHeight = '90vh';
      this.fullwindowMargin = '0 3.5% 2% .5%';
      this.minimizeHeight = 'inline-flex';
      this.minmaxIcon = 'min-email';
      this.expandshrinkIcon = 'shrink';
      tinymce.get(this.emailEditorInstanceId).show();
      tinymce.get(this.emailEditorInstanceId).theme.resizeTo('100%', 140);
    } else {
      this.fullwindowWidth = '50vw';
      this.fullwindowHeight = 'auto';
      this.fullwindowMargin = '0';
      this.minimizeHeight = 'inline-flex';
      this.minmaxIcon = 'min-email';
      this.expandshrinkIcon = 'expand';
      tinymce.get(this.emailEditorInstanceId).show();
      tinymce.get(this.emailEditorInstanceId).theme.resizeTo('100%', 100);
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
            prospectId: '',
          };
          obj.prospectEmailList.push(prospectEmailDetail);
        } else {
          if (invalidEmailText) {
            invalidEmailText = invalidEmailText + ' ' + emaildId;
          } else {
            invalidEmailText = emaildId;
          }
          // console.log(invalidEmailText);
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
    tinymce.get(this.emailEditorInstanceId).setContent(message);
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
    if (this.emailEditorInput.emailEditorSourceType === EmailEditorSourceType.Draft) {
      const postData = this.getDraftData();
      this.loaderService.show();
      this.emailService.updateDraft(postData).subscribe(res => {
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
        } else { // On Validation Error
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
      this.emailService.saveDraft(postData).subscribe(res => {
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
        } else { // On Validation Error
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
    this.emailService.sendEmail(postData).subscribe(res => {
      // On Success
      this.loaderService.hide();
      if (res.state) {
        if (this.emailEditorInput.emailEditorSourceType === EmailEditorSourceType.Sent) {
          const sourceType = EmailEditorSourceType.Sent;
          this.emailDataService.refreshView(sourceType);
        }
        this.alertService.success('Email sent successfully!');
        this.closeDialog();
      } else { // On Validation Error
        if (res.message.errors.length > 0) {
          // this.alertService.error(res.message.errors[0].message +
          //  " does not exist in the prospect database. Please correct and try again.");
          this.alertService.error(res.message.errors[0].message);
        } else {
          this.alertService.error('Invalid Email address. Please correct and try again.');
        }
      }
    },
      err => {
        this.loaderService.hide();
      }
    );
  }

  validateSubject() {
    if (this.emailForm.get('subject').value && this.emailForm.get('subject').value.trim() !== '') {
      return true;
    } else {
      this.alertService.error('The E-mail subject is mandatory.Please enter subject.');
      this.emailSubjectInput.nativeElement.focus();
      return false;
    }
  }

  validateMessage() {
    const emailTextValue = tinymce.get(this.emailEditorInstanceId).getContent();
    if (emailTextValue && emailTextValue.trim() !== '') {
      return true;
    } else {
      tinymce.get(this.emailEditorInstanceId).focus();
      this.alertService.error('The E-mail message is mandatory.Please enter message.');
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
      this.alertService.error('Invalid E-mail address format ' + invalidEmail + '. Please enter validate E-Mail Address format.');
      return false;
    }
  }

  validateEmailList() {
    if (this.prospectEmailList.length > 0) {
      return true;
    } else {
      this.directEmailInput.nativeElement.focus();
      this.alertService.error('At least one Email is mandatory. Please enter Email Id.');
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
    const emailDraft: EmailDraft = {
      id: this.emailEditorInput.id ? this.emailEditorInput.id : '',
      type: '',
      receipients: receipients,
      createdBy: '1',
      modifiedBy: '1',
      createdOn: new Date(),
      modifiedOn: new Date(),
      subject: this.emailForm.get('subject').value,
      body: tinymce.get(this.emailEditorInstanceId).getContent()
    };
    return emailDraft;
  }

  getEmailData() {
    const emailList = this.getProspectEmails();
    // emails = this.removeDuplicate(emails);
    const emailData: EmailData = {
      id: '',
      type: '',
      emails: emailList,
      subject: this.emailForm.get('subject').value,
      body: tinymce.get(this.emailEditorInstanceId).getContent()
    };
    return emailData;
  }

  confirmCancel() {
    const confirmationDialog = this.matDialog.open(
      ConfirmationDialogComponent,
      {
        width: '20%',
        hasBackdrop: true,
        disableClose: true,
        panelClass: 'confirm-dialogbox',
        data: {
          message: 'Your changes will be lost. Do you want to proceed?',
          acceptText: 'Yes',
          rejectText: 'No'
        }
      }
    );

    confirmationDialog.afterClosed().subscribe(action => {
      if (action === 'Yes') {
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.cleanUp();
    this.closeEmail.emit(false);
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
    const editorInstance = tinymce.get(this.emailEditorInstanceId);
    if (editorInstance) {
      editorInstance.remove();
    }
  }
}
