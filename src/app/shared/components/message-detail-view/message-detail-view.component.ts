import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-message-detail-view',
  templateUrl: './message-detail-view.component.html',
  styleUrls: ['./message-detail-view.component.scss']
})
export class MessageDetailViewComponent implements OnInit {
  @Input() calledFrom;
  @Input() sentData;
  @Output() goBack = new EventEmitter<boolean>();
  @Output() replyMessage = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {
  }

  backToList() {
    this.goBack.emit(true);
  }
  replyData(messageData) {
    this.replyMessage.emit(messageData);
  }
}
