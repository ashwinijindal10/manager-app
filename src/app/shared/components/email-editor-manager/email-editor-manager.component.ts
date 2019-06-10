import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmailEditorInput } from '../../../shared/model/email/email-editor-input';
import { EmailEditorSourceType } from '../../../shared/model/email/email-editor-source-type';
import { EmailDataService } from '../../../shared/services/email/email-data.service';
import { ProspectEmailDetail } from '../../../shared/model/email/prospect-email-detail';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-editor-manager',
  templateUrl: './email-editor-manager.component.html',
  styleUrls: ['./email-editor-manager.component.scss']
})
export class EmailEditorManagerComponent implements OnInit, OnDestroy {
  showEmailEditor1 = false;
  showEmailEditor2 = false;
  showEmailEditor3 = false;

  emailEditorInstanceName1 = '';
  emailEditorInstanceDisplayName1 = '';
  selectedProspectEmailList1: ProspectEmailDetail[];
  emailEditorInput1: EmailEditorInput;
  EmailEditorSourceType: EmailEditorSourceType;
 // EmailEditorSourceType1: EmailEditorSourceType;

  emailEditorInstanceName2 = '';
  emailEditorInstanceDisplayName2 = '';
  selectedProspectEmailList2: ProspectEmailDetail[];
  emailEditorInput2: EmailEditorInput;
  // EmailEditorSourceType2: EmailEditorSourceType;

  emailEditorInstanceName3 = '';
  emailEditorInstanceDisplayName3 = '';
  selectedProspectEmailList3: ProspectEmailDetail[];
  emailEditorInput3: EmailEditorInput;
  // EmailEditorSourceType3: EmailEditorSourceType;

  private subscription: Subscription;

  constructor(
    private emailDataService: EmailDataService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.subscription = this.emailDataService.getData.subscribe(
      emailEditorData => {
        if (emailEditorData) {
          this.openEmailEditor(emailEditorData);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  validateEmailInstances(emailEditorInput: EmailEditorInput) {
    let valid = true;
    if (this.showEmailEditor1) {
      if (this.emailEditorInput1.emailEditorSourceType === emailEditorInput.emailEditorSourceType &&
        this.emailEditorInput1.emailEditorSourceType === EmailEditorSourceType.Draft &&
        this.emailEditorInput1.id === emailEditorInput.id) {
          valid = false;
      }
    }
    if (this.showEmailEditor2) {
      if (this.emailEditorInput2.emailEditorSourceType === emailEditorInput.emailEditorSourceType &&
        this.emailEditorInput2.emailEditorSourceType === EmailEditorSourceType.Draft &&
        this.emailEditorInput2.id === emailEditorInput.id) {
          valid = false;
      }
    }
    if (this.showEmailEditor3) {
      if (this.emailEditorInput3.emailEditorSourceType === emailEditorInput.emailEditorSourceType &&
        this.emailEditorInput3.emailEditorSourceType === EmailEditorSourceType.Draft &&
        this.emailEditorInput3.id === emailEditorInput.id) {
          valid = false;
      }
    }
    return valid;
   }
  openEmailEditor(emailEditorInput: EmailEditorInput) {
    if (this.validateEmailInstances(emailEditorInput)) {
      if (!this.showEmailEditor1) {
        this.emailEditorInstanceName1 = 'emailEditorIntance1';
        // this.selectedProspectEmailList1 = [];
        this.emailEditorInput1 = emailEditorInput;
        this.showEmailEditor1 = true;
        this.emailEditorInstanceDisplayName1 = 'New Message 1';
      } else if (!this.showEmailEditor2) {
        this.emailEditorInstanceName2 = 'emailEditorIntance2';
        // this.selectedProspectEmailList2 = [];
        this.emailEditorInput2 = emailEditorInput;
        this.showEmailEditor2 = true;
        this.emailEditorInstanceDisplayName2 = 'New Message 2';
      } else if (!this.showEmailEditor3) {
        this.emailEditorInstanceName3 = 'emailEditorIntance3';
        // this.selectedProspectEmailList3 = [];
        this.emailEditorInput3 = emailEditorInput;
        this.showEmailEditor3 = true;
        this.emailEditorInstanceDisplayName3 = 'New Message 3';
      } else {
        this.alertService.error(
          'You have 3 active email editors already open. Please Save or Send to proceed.'
        );
      }
    }
  }

  closeEmail(instanceName) {
    if (instanceName === 'emailEditorIntance1') {
      this.showEmailEditor1 = false;
    } else if (instanceName === 'emailEditorIntance2') {
      this.showEmailEditor2 = false;
    } else if (instanceName === 'emailEditorIntance3') {
      this.showEmailEditor3 = false;
    }
  }
}
