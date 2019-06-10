import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-note-details',
  templateUrl: './activity-note-details.component.html',
  styleUrls: ['./activity-note-details.component.scss']
})
export class ActivityNoteDetailsComponent implements OnInit {
  @Input() noteDetails;
  @Input() showChild: boolean;
  @Output() refreshNotes = new EventEmitter<any>();
  prospectId: string;
  noteTitle: string;
  notecomments: string;
  showComments = false;
  userEmail: string;
  type: string;
  viewMore = true;
  constructor() {}

  ngOnInit() {
    this.userEmail = 'abc@gmail.com';
  }

  editNote() {
    this.notecomments = this.noteDetails.logMessage;
    this.noteTitle = 'Edit Note';
    this.showComments = true;
  }

  deleteNote(activityId) {}

  addComment() {
    this.noteTitle = 'Add Comment';
    this.showComments = true;
  }

  editComment() {
    this.noteTitle = 'Edit Comment';
  }

  deleteComment(commentid) {}

  activityComment(event) {
    if (event.status) {
      //// call api
      this.refreshNotes.emit(event);
      this.showComments = false;
    } else {
      this.showComments = false;
    }
  }
}
