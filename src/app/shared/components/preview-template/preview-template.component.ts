import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { TemplateItem } from '../template-content/template';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.scss']
})
export class PreviewTemplateComponent implements OnInit {
  constructor(public matDialogRef: MatDialogRef<PreviewTemplateComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit () {
  }

  performAction (action) {
    this.matDialogRef.close(action);
  }
}
