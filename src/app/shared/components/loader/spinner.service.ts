import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  /**
   * @description spinners BehaviorSubject
   * @memberof LoadingSpinnerService
   */
  public spinnerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() { }

  /**
   * To show spinner
   * @memberof LoadingSpinnerService
   */
  show() {
    this.spinnerSubject.next(true);
  }

  /**
   * To hide spinner
   * @memberof LoadingSpinnerService
   */
  hide() {
    this.spinnerSubject.next(false);
  }

  getMessage(): Observable<any> {
    return this.spinnerSubject.asObservable();
  }
}
