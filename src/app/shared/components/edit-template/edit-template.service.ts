import { Injectable } from '@angular/core';
import { HttpApiService } from '../../services/http-api.service';
import { Observable, of } from 'rxjs';
import { TemplateItem } from '../template-content/template';

@Injectable({
  providedIn: 'root'
})
export class EditTemplateService {
  constructor(private httpApiService: HttpApiService) {}

  getTemplate(id: string): Observable<any> {
    const parameters = {
      templateId: id
    };

    return this.httpApiService.getData(`emailtemplates/${id}`);
  }

  getTemplateCategories(): Observable<any> {
    return this.httpApiService.getData('emailtemplates/masters');
  }
}
