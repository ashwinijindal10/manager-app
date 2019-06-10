import { JobsDetailsService } from './../../../../modules/jobs/services/jobs-details.service';
import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



export interface DialogData {
  jobIds?: string[];
  jobId?: string;
}
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  note = '';
  @Input() notesApply: string;

  constructor(
    public dialogRef: MatDialogRef<AddNoteComponent>,
    public jobsDetailsService: JobsDetailsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.notesApply = this.data.noteDescription;
  }

  close() {
    this.dialogRef.close();
  }

  addNote() {
    this.dialogRef.close({ status : 'addNote', noteData : this.note });
  }
}
