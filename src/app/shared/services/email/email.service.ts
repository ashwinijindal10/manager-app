import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpApiService } from '../http-api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpApiService: HttpApiService) {}

  sendEmail(data: any): Observable<any> {
    return this.httpApiService.postData('emails/send', data);
  }
  getEmailList(page, pageData) {
    return this.httpApiService.getData(
      `emails/inbox/pageno/${page}/pagesize/${pageData}/all`
    );
  }
  log(filename: any, data: {}): void {
    throw new Error('Method not implemented.');
  }
  getEmailUnread(pageData): Observable<any> {
    return this.httpApiService.getData(
      `emails/inbox/pageno/1/pagesize/10/unread`
    );
  }

  saveDraft(data: any): Observable<any> {
    return this.httpApiService.postData('emails/drafts', data);
  }

  updateDraft(data: any): Observable<any> {
    return this.httpApiService.putData('emails/drafts', data);
  }
  getEmailListData(pageData): Observable<any> {
    return this.httpApiService.getData(
      `emails/drafts/pageno/${pageData.pageNo}/pagesize/${pageData.pageSize}`
    );
  }
  getDraftData(pageData): Observable<any> {
    return this.httpApiService.getData(
      `emails/drafts/pageno/${pageData.pageNo}/pagesize/${pageData.pageSize}`
    );
  }

  getSentData(pageData): Observable<any> {
    return this.httpApiService.getData(
      `emails/sentitems/pageno/${pageData.pageNo}/pagesize/${pageData.pageSize}`
    );
  }

  sentPageInfo(data): Observable<any> {
    return this.httpApiService.postData('emails/sentitems/search', data);
  }

  getDataById(id): Observable<any> {
    return this.httpApiService.getData(`emails/draft/${id}`);
  }

  draftPageInfo(data) {
    return this.httpApiService.postData('emails/drafts/search', data);
  }

  saveData(data): Observable<any> {
    return this.httpApiService.putData('emails/drafts', data);
  }
}
