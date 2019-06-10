import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TmpUserValidateComponent } from '../tmp-user-validate/tmp-user-validate.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
  validateUser() {
    const dialogRef = this.dialog.open(TmpUserValidateComponent, {
      height: '200px',
      width: '350px',
      hasBackdrop: true
    });
  }
}
