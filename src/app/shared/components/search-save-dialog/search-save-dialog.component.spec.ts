import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSaveDialogComponent } from './search-save-dialog.component';
import { MaterialModule } from '../../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {
  MatStepperModule, MatDialogRef, MAT_DIALOG_DATA,
  MatFormFieldModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatDialogModule
} from '@angular/material';


import { SearchService } from '../../services/search.service';
import { AlertService } from '../../../shared/services/alert.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject, Observable, of, observable, throwError } from 'rxjs';
import { fn } from '@angular/compiler/src/output/output_ast';

class MockSearchService {
  public prospectAutoSearch$ = new Subject();
  public jobAutoSearch$ = new Subject();
  public prospectCurrentSearch$ = new Subject();

  getSearchIndexFields(type): Observable<any> {
    return;

  }
  loadAutoSearchResult(type, autoSearchRequest): Observable<any> {
    return;
  }

  getSearchResults(searchRequest): Observable<any> {
    return;
  }

  getSavedSearches({ userId, type }): Observable<any> {
    return;
  }

  saveSearch(saveRequest): Observable<any> {
    return of({
      state: 'Succesfully Saved the Mock', message: { success: 'Yessssss', errors: 'No error' }
    });
  }

  deleteSearch(searchRequestId): Observable<any> {
    return;
  }

}
class MockDialogRef {
  close() {

  }
}

describe('SearchSaveDialogComponent', () => {
  let component: SearchSaveDialogComponent;
  let fixture: ComponentFixture<SearchSaveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        MatStepperModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
      ],
      declarations: [SearchSaveDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MatDialogRef , useClass: MockDialogRef },
        { provide: MAT_DIALOG_DATA },
        { provide: SearchService, useClass: MockSearchService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSaveDialogComponent);
    component = fixture.componentInstance;
    component.data = {searchResults: '',
        prospectSearchData: '',
        type: 'Jobs'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save the search', () => {
    const input = fixture.nativeElement.querySelector('mat-form-field input');
    input.value = 'Dummy Search';
    input.dispatchEvent(new Event('input'));
    expect(component.searchQueryName.value).toContain('Dummy');
  });

  it('Saving the query', () => {
    const input = fixture.nativeElement.querySelector('mat-form-field input');

    input.value = 'Dummy Search';
    input.dispatchEvent(new Event('input'));
    component.data = { prospectSearchData: '', searchResults: '', type: '' };
    fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);

    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);

    MockSearchService.prototype.saveSearch = (() => {
      return of({
        state: '', message: { success: '', errors: [{ message: 'The name already exists' }] }
      });
    });

    input.value = 'Dummy';
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);

    MockSearchService.prototype.saveSearch = (() => {
      return throwError('Errrrrrr');
    });

    input.value = 'ErrorFromServer';
    input.dispatchEvent(new Event('input'));
    fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);
  });

  it('Closing the component', () => {
    fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click', null);
    spyOn(component, 'closeSearch');
    fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click', null);
    expect(component.closeSearch).toHaveBeenCalled();
  });
});
