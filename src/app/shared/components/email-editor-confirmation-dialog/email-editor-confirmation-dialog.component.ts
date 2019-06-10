import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-editor-confirmation-dialog',
  templateUrl: './email-editor-confirmation-dialog.component.html',
  styleUrls: ['./email-editor-confirmation-dialog.component.scss']
})
export class EmailEditorConfirmationDialogComponent implements OnInit {
  @Output() confirmMessage = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onNo() {
    this.confirmMessage.emit(false);
  }

  onYes() {
    this.confirmMessage.emit(true);
  }
}
