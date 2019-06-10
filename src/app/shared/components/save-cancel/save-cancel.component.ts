import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-save-cancel',
  templateUrl: './save-cancel.component.html',
  styleUrls: ['./save-cancel.component.scss']
})
export class SaveCancelComponent implements OnInit {
  @Output() editted = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  save() {
    this.editted.emit(true);
  }

  cancel() {
    this.editted.emit(false);
  }

}
