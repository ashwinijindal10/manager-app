import { Injectable } from '@angular/core';
import { BehaviorSubject, AsyncSubject } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailEditorModalDialogService {
  // emailEditorinstanceName: string = "";
  // private modalDialogSource = new AsyncSubject();
  // onMaximize = this.modalDialogSource.asObservable();

  private modalDialogSource: EventEmitter<string> = new EventEmitter();

  constructor() { }

  maximize(emailEditorinstanceId: string) {
    // this.modalDialogSource.next(emailEditorinstanceId);
    // this.modalDialogSource.complete();
    this.modalDialogSource.emit(emailEditorinstanceId);
  }

  onMaximize() {
    return this.modalDialogSource;
  }
}
