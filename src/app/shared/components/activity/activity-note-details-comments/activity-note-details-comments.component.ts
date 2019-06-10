import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-note-details-comments',
  templateUrl: './activity-note-details-comments.component.html',
  styleUrls: ['./activity-note-details-comments.component.scss']
})
export class ActivityNoteDetailsCommentsComponent implements OnInit {
  @Input() data;
  @Input() userEmail: string;
  @Input() showViewMore: boolean;
  @Output() prospectComments = new EventEmitter<any>();
  @Output() deleteComment = new EventEmitter<string>();
  showComments = false;
  notecomments: string;
  type: string;
  noteTitle: string;
  constructor() {}

  ngOnInit() {
    this.userEmail = 'abc@gmail.com';
  }

  addComment() {
    this.notecomments = '';
    this.type = 'add';
    this.noteTitle = 'Add Comment';
    this.showComments = true;
  }

  editComment() {
    this.notecomments = this.data.text;
    this.type = 'update';
    this.noteTitle = 'Edit Comment';
    this.showComments = true;
  }

  deleteComments(obj) {
    // this.type = "delete";
    // console.log("delete comment is ");
    // console.log(this.data);
    // console.log(obj);
    // this.deleteComment.emit(obj.commentId);
  }

  showFilterDetails() {}

  activityComment(event) {
    if (event.status) {
      this.showComments = false;
    } else {
      this.showComments = false;
    }
    // this.prospectComments.emit({
    //   type: this.type,
    //   status: obj.status,
    //   data: obj.data,
    //   commentId: this.data.commentId
    // });
    // this.showNote = false;
  }
}
