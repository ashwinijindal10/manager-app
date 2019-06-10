import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  $preventNewTreeChild = new Subject<boolean>();
  private  $removeNewMessageNode  =  new  Subject<boolean>();
  private  $viewMessage  =  new  Subject<string>();

  viewMessage(message: string) {
    this.$viewMessage.next(message);
  }

  onViewMessage():  Observable<any> {
    return  this.$viewMessage.asObservable();
  }
}
