import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-note-details-comments-dialog',
  templateUrl: './activity-note-details-comments-dialog.component.html',
  styleUrls: ['./activity-note-details-comments-dialog.component.scss']
})
export class ActivityNoteDetailsCommentsDialogComponent implements OnInit {
  @Input() data;
  @Input() noteTitle: string;
  @Input() noteSubTitle: string;
  @Input() notecomments: string;
  @Output() comment = new EventEmitter<ActivityComment>();
  note: string;
  constructor() {}

  ngOnInit() {
    if (this.notecomments) {
      this.note = this.notecomments;
    }
    this.noteSubTitle = ' This notes will apply to ';
  }

  edit(status) {
    this.comment.emit({ status: status, data: this.note });
  }
}

export interface ActivityComment {
  status: boolean;
  data: string;
}
