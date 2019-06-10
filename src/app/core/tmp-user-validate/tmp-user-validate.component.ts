import { HttpApiService } from './../../shared/services/http-api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tmp-user-validate',
  templateUrl: './tmp-user-validate.component.html',
  styleUrls: ['./tmp-user-validate.component.scss']
})
export class TmpUserValidateComponent implements OnInit {
  userEmail: string;
  showError = false;
  error: string;
  constructor(
    private api: HttpApiService,
    private userDialog: MatDialogRef<TmpUserValidateComponent>
  ) {}

  ngOnInit() {}

  validateUser() {
    this.api.getValidUser(this.userEmail).subscribe(res => {
      //// 1. response status as success store the user name and email
      //// 2. else show the error message
      if (res.state) {
        this.showError = false;
        for (let i = 0; i < res.data.length; i++) {
          if (this.userEmail === res.data[i].email) {
            localStorage.setItem('userEmail', res.data[i].email);
            localStorage.setItem('userName', res.data[i].name);
            this.api.onUserChanged$.next(true);
            this.userDialog.close();
          } else {
            this.error = 'Please enter the correct email';
            this.showError = true;
          }
        }
      }
    });
  }

  cancel() {
    this.userDialog.close();
  }
}
