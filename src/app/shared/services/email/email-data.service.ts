import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EmailEditorInput } from '../../model/email/email-editor-input';
import { EmailEditorSourceType } from '../../model/email/email-editor-source-type';

@Injectable({
  providedIn: 'root'
})
export class EmailDataService {
  emailEditorInput: EmailEditorInput;
  private messageSource = new BehaviorSubject(this.emailEditorInput);
  getData = this.messageSource.asObservable();

  private refreshViewSource = new BehaviorSubject(null);
  onRefreshView = this.refreshViewSource.asObservable();

  public onEmailEditorSuccess = new Subject();

  constructor() { }

  sendData(emailEditorInput1: EmailEditorInput) {
    this.messageSource.next(emailEditorInput1);
  }

  refreshView(emailEditorSourceType: EmailEditorSourceType) {
    this.refreshViewSource.next(emailEditorSourceType);
  }
}
