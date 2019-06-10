import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  autoHide = 3000;
  constructor(public snackBar: MatSnackBar) {}

  success(msg: string, myClass?: string, position?: any, duration?: number) {
    const config = new MatSnackBarConfig();
    const actionLabel = 'X';
    config.verticalPosition = position ? position : 'top';
    config.duration = duration ? duration : this.autoHide;
    config.panelClass = myClass
      ? ['success-snackbar', myClass]
      : ['success-snackbar'];
    this.snackBar.open(msg, actionLabel, config);
  }

  error(msg: string, myClass?: string, position?: any, duration?: number) {
    const config = new MatSnackBarConfig();
    const actionLabel = 'X';
    config.verticalPosition = position ? position : 'top';
    config.duration = duration ? duration : this.autoHide;
    config.panelClass = myClass
      ? ['error-snackbar', myClass]
      : ['error-snackbar'];
    this.snackBar.open(msg, actionLabel, config);
  }

  warning(msg: string, myClass?: string, position?: any, duration?: number) {
    const config = new MatSnackBarConfig();
    const actionLabel = 'X';
    config.verticalPosition = position ? position : 'top';
    config.duration = duration ? duration : this.autoHide;
    config.panelClass = myClass
      ? ['warning-snackbar', myClass]
      : ['warning-snackbar'];
    this.snackBar.open(msg, actionLabel, config);
  }
}
