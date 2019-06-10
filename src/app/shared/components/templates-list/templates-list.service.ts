import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TemplateItem } from '../template-content/template';
import { HttpApiService } from '../../../shared/services/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class TemplatesListService {
  constructor(private httpApiService: HttpApiService) {}

  getMasterData(): Observable<any> {
    return this.httpApiService.getData('emailtemplates/masters');
  }

  getTemplateList(type: string, category: string): Observable<any> {
    return this.httpApiService.getData(`emailtemplates/${category}/${type}`);
  }
}
