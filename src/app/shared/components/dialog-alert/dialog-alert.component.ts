import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss']
})
export class DialogAlertComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }
  @Input() data;
  ngOnInit() {
  }
  closeAlert() {
    this.snackBar.dismiss();
  }
}
