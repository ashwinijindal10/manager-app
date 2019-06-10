import { async, ComponentFixture, TestBed, ComponentFixtureNoNgZone, fakeAsync, tick } from '@angular/core/testing';

import { QueryBuilderComponent } from './query-builder.component';
import { MaterialModule } from '../../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// tslint:disable-next-line: max-line-length
import { MatStepperModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule, MatProgressBarModule, MatCardModule, MatIconModule, MatSpinner } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatRadioChange, MatAutocomplete } from '@angular/material';
import { Subject, Observable, of, throwError } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { By } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';


const mocksearchResultsData = {
  recordsCount: 0,
  totalRecordsCount: 28,
  currentPageNo: 0,
  selfUri: null,
  nextUri: null,
  previousUri: null,
  data: [],
  state: true,
  message: { success: 'Results fetched based on the query', errors: [] }
};

const locationMockResultsData = {
  data: {
    count: 4,
    totalCount: 15,
    records: [
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'IN', countryCode: 'IN', formattedName: 'Loc1', state: '', postalCode: '', latitude: 17, longitude: 75, locationId: 1 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'IN', countryCode: 'IN', formattedName: 'Loc2', state: null, 'city': null, postalCode: '', latitude: 17, longitude: 75, locationId: 2 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'US', countryCode: 'US', formattedName: 'Loc3', state: '', postalCode: '', latitude: 17, longitude: 75, locationId: 3 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'US', countryCode: 'US', formattedName: 'Loc5', state: '', 'city': 'INn Trail', postalCode: '', latitude: 17, longitude: 75, locationId: 5 }]
  },
  state: true, message: { success: 'Location Listed Successfully', errors: [] }
};

const zipMockResultsData = {
  data:
  {
    count: 4, totalCount: 8,
    records: [
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'India', 'countryCode': 'IN', formattedName: 'Kolkata,West Bengal,India,700014', state: 'West Bengal', 'city': 'Kolkata', postalCode: '700014', latitude: 22.5626, longitude: 88.363, 'locationId': 1275004 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'United States', 'countryCode': 'US', formattedName: 'Metairie,Louisiana,United States,70004', state: 'Louisiana', 'city': 'Metairie', postalCode: '70004', latitude: 29.9841, longitude: -90.1529, 'locationId': 4333177 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'India', 'countryCode': 'IN', formattedName: 'Howrah,West Bengal,India,700070', state: 'West Bengal', 'city': 'Howrah', postalCode: '700070', latitude: 22.588, longitude: 88.3185, 'locationId': 1270396 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'Japan', 'countryCode': 'JP', formattedName: 'Okayama,Okayama,Japan,700-0942', state: 'Okayama', 'city': 'Okayama', postalCode: '700-0942', latitude: 34.6288, longitude: 133.9278, 'locationId': 1854383 }]
  },
  state: true, message: { success: 'Zip Listed Successfully', errors: [] }
};

const otherMockSearchResultsData = {
  data: {
    count: 4,
    totalCount: 20,
    records: ['One', 'Two', 'Threee', 'Four']
  },
  state: true, message: { success: 'Others Listed Successfully', errors: [] }
};

const autoCompleteRequest = {
  tenantId: 0,
  orgId: 1,
  searchFields: [
    {
      searchData: { term: '' },
      type: 5,
      fieldName: 'Zip'
    }],
  pageNumber: 1,
  pageSize: 4,
  locale: 'en',
  sorts: []
};

const savedSearchesMockResultsData = {
  data: [
    {
      searchRequestId: '2a35ff1b-0a56-485c-b3c4-d0377a7f91c6',
      tenantId: 0, userId: 1, type: 'Prospect', searchRequest: {
        tenantId: 1, orgId: 1,
        searchFields: [{
          searchData: 'tin', type: 3, fieldName: 'skills'
        }, {
          searchData: 'Che', type: 5, fieldName: 'zip'
        }, {
          searchData: '789', type: 4, fieldName: 'location'
        }],
        pageNumber: 1, pageSize: 100, locale: 'en'
      },
      createdOn: '2019-04-25T09:57:56.569551',
      searchName: 'SearchDemo1'
    }, {
      searchRequestId: '2a35ff1b-0a56-485c-b3c4-d0677a7f91c6',
      tenantId: 0, userId: '1', type: 'Prospect', searchRequest: {
        tenantId: '1', orgId: '1',
        searchFields: [{
          searchData: 'fin', type: 3, fieldName: 'skills'
        }, {
          searchData: 'ind', type: 5, fieldName: 'zip'
        }, {
          searchData: 'fin', type: 4, fieldName: 'location'
        }],
        pageNumber: 1, pageSize: 100, locale: 'en'
      },
      createdOn: '2019-04-25T09:57:56.599551',
      searchName: 'SearchDemo2'
    }], state: true,
  message: { success: 'Data retrieved successfully', errors: [] }
};



class MockSearchService {
  public prospectAutoSearch$ = new Subject();
  public jobAutoSearch$ = new Subject();
  public prospectCurrentSearch$ = new Subject();

  getSearchIndexFields(type): Observable<any> {
    return of({
      data: [
        { key: '2', value: 'Category' },
        { key: '4', value: 'Location' },
        { key: '6', value: 'Name' },
        { key: '3', value: 'Skills' },
        { key: '5', value: 'Zip' }
      ],
      state: true,
      message: { success: 'Index Fields Listed Successfully', errors: [] }
    }
    );
  }
  loadAutoSearchResult(type, autoSearchRequest): Observable<any> {
    const { searchFields } = autoSearchRequest;
    const indexField = searchFields.map(searchField => searchField.fieldName)[0];
    // if(indexField === "Job Title" || indexField === "Req Number") {
    //     indexField = indexField.split(" ").join("");
    // }
    if (autoSearchRequest.searchFields[0].fieldName === 'Location') {
      return of(locationMockResultsData);
    } else if (autoSearchRequest.searchFields[0].fieldName === 'Zip') {
      return of(zipMockResultsData);
    } else {
      return of(otherMockSearchResultsData);
    }
  }

  getSearchResults(searchRequest): Observable<any> {
    return of(mocksearchResultsData);
  }

  getSavedSearches({ userId, type }): Observable<any> {
    return of(savedSearchesMockResultsData);
  }

  saveSearch(saveRequest): Observable<any> {
    return;
  }

  deleteSearch(searchRequestId): Observable<any> {
    return of(
      `{
        "state": true,
        "message": {
          "success": "Succefully deleted the SearchQuery",
          "errors": []
        }
      }`
    );
  }

}


describe('QueryBuilderComponent:CurrentSearch-Tab', () => {
  let component: QueryBuilderComponent;
  let fixture: ComponentFixture<QueryBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
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
        MatSelectModule,
        MatProgressBarModule,
        MatCardModule,
        MatIconModule,
      ],
      declarations: [QueryBuilderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: SearchService, useClass: MockSearchService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBuilderComponent);
    component = fixture.componentInstance;
    component.selectedTabIndex = 0;
    component.searchIndexFields = [{ key: 2, value: 'Category' },
    { key: 4, value: 'Location' }, { key: 6, value: 'Name' }, { key: 3, value: 'Skills' }, { key: 5, value: 'Zip' }];
    component.searchResults = [];
    component.type = 'Prospect';
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change', () => {
    component.selectedTabIndex = 1;
    fixture.detectChanges();
    component.selectedTabIndex = 0;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have initial data', () => {
    component.searchResults = [{
      searchData: 'Name1',
      type: 6,
      fieldName: 'Name',
      display: 'Name T'
    },
    {
      searchData: 'Name2',
      type: 6,
      fieldName: 'Name',
      display: 'Name TT'
    }];
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentSearchDetails.controls[component.searchCategories.indexOf('Name')].value).toEqual('Name T; Name TT');
  });

  it('should load autosearchResults for Name', () => {
    component.searchResults = [{
      searchData: 'Name1',
      type: 6,
      fieldName: 'Name',
      display: 'Name T'
    },
    {
      searchData: 'Name2',
      type: 6,
      fieldName: 'Name',
      display: 'Name TT'
    }];
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentSearchDetails.controls[component.searchCategories.indexOf('Name')].value).toEqual('Name T; Name TT');

    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Name')].nativeElement.click();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Name')].nativeElement.value = 'Than';
    fixture.detectChanges();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Name')].nativeElement.dispatchEvent(new Event('input'));
  });

  it('should load autosearchResults for Location', () => {
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Location')].nativeElement.click();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Location')].nativeElement.value = 'lo';
    fixture.detectChanges();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Location')].nativeElement.dispatchEvent(new Event('input'));

    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Location')].nativeElement.value = 'local1';
    fixture.detectChanges();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Location')].nativeElement.dispatchEvent(new Event('input'));
  });

  it('should load autosearchResults for Zip', () => {
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Zip')].nativeElement.click();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Zip')].nativeElement.value = 'loca1';
    fixture.detectChanges();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Zip')].nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  });

  it('Invalid request', () => {
    spyOn(MockSearchService.prototype, 'loadAutoSearchResult').and.callFake((type, autoSearchRequest) => {
      return of({
        state: '', message: { success: '', errors: [{ message: 'No Data' }] }
      });
    });
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Zip')].nativeElement.click();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Zip')].nativeElement.value = 'loca1';
    fixture.detectChanges();
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Zip')].nativeElement.dispatchEvent(new Event('input'));
  });

  it('Error from server', () => {
    spyOn(MockSearchService.prototype, 'loadAutoSearchResult').and.callFake((x, y) => {
      return throwError('Errr!! Server Down');
    });
    expect(component.searchOptions.length).toEqual(0);
  });

  it('Error Handling while fetching records', () => {
    spyOn(MockSearchService.prototype, 'getSearchIndexFields').and.callFake(() => {
      return of({
        data: [],
        state: false,
        message: {
          success: '',
          errors: [{ message: 'Errrorrrrrrrrrrr' }]
        }
      });
    });
    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('resets form when user clicks reset button', () => {
    component.searchResults = [{
      searchData: 'Name1',
      type: 6,
      fieldName: 'Name',
      display: 'Name T'
    },
    {
      searchData: 'Name2',
      type: 6,
      fieldName: 'Name',
      display: 'Name TT'
    }];
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentSearchDetails.controls[component.searchCategories.indexOf('Name')].value).toEqual('Name T; Name TT');

    fixture.debugElement.queryAll(By.css('div[fxLayoutAlign="end start"] button')).map(element => {
      if (element.nativeElement.innerText === 'RESET') {
        element.triggerEventHandler('click', null);
      }
    });
    component.submitFormData();
    expect(component.searchResults.length).toBe(0);
  });

  it('should remove the trailing comma', () => {
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Zip')].nativeElement.click();
    component.selectInForm({ option: { value: '500049' } });
    component.queryBuilderSearch.toArray()[component.searchCategories.indexOf('Zip')].nativeElement.blur();
  });

  it('resets form when user clicks cancel button', () => {
    fixture.debugElement.queryAll(By.css('div[fxLayoutAlign="end start"] button')).map(element => {
      if (element.nativeElement.innerText === 'CANCEL') {
        element.triggerEventHandler('click', null);
      }
    });
    spyOn(component, 'ClosePopup');
    fixture.debugElement.queryAll(By.css('div[fxLayoutAlign="end start"] button')).map(element => {
      if (element.nativeElement.innerText === 'CANCEL') {
        element.triggerEventHandler('click', null);
      }
    });
    expect(component.ClosePopup).toHaveBeenCalled();
  });

  it('resets form when user clicks apply button', () => {
    component.searchResults = [{
      searchData: 'Name1',
      type: 6,
      fieldName: 'Name',
      display: 'Name T'
    },
    {
      searchData: 'Name2',
      type: 6,
      fieldName: 'Name',
      display: 'Name TT'
    },
    {
      searchData: {
        city: 'Hyd',
        country: 'IND',
        countryCode: null,
        formattedName: 'India',
        latitude: 78,
        longitude: 67,
        postalCode: 500049,
        state: 'string',
        term: 'string',
      },
      type: 4,
      fieldName: 'Location',
      display: 'Hyderabad',
    },
    {
      searchData: {
        city: 'Hyd',
        country: 'IND',
        countryCode: null,
        formattedName: 'India',
        latitude: 78,
        longitude: 67,
        postalCode: 500049,
        state: 'string',
        term: 'string',
      },
      type: 5,
      fieldName: 'Zip',
      display: 'Hyderabad',
    }];
    component.locationSearchResults = [{
      city: 'Hyd',
      country: 'IND',
      countryCode: null,
      formattedName: 'India',
      latitude: 78,
      longitude: 67,
      postalCode: 500049,
      state: 'string',
      term: 'string'
    }];
    component.zipSearchResults = [{
      city: 'Hyd',
      country: 'IND',
      countryCode: null,
      formattedName: 'India',
      latitude: 78,
      longitude: 67,
      postalCode: 500049,
      state: 'string',
      term: 'string'
    }];
    fixture.detectChanges();
    component.ngOnInit();

    fixture.debugElement.queryAll(By.css('div[fxLayoutAlign="end start"] button')).map(element => {
      if (element.nativeElement.innerText === 'APPLY') {
        element.triggerEventHandler('click', null);
      }
    });
    expect(component.searchResults.length).toBeGreaterThan(0);
  });
});

describe('QueryBuilderComponent:SavedSearch-Tab', () => {
  let component: QueryBuilderComponent;
  let fixture: ComponentFixture<QueryBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        MatStepperModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatProgressBarModule,
        MatCardModule,
        MatIconModule,
      ],
      declarations: [QueryBuilderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: SearchService, useClass: MockSearchService }]
    }).compileComponents();
    const service = TestBed.get(SearchService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBuilderComponent);
    component = fixture.componentInstance;
    component.selectedTabIndex = 0;
    component.searchIndexFields = [];
    component.searchResults = [];
    component.type = 'Prospect';
    component.savedSearches = [];
    fixture.detectChanges();
    component.selectedTabIndex = 1;
    fixture.detectChanges();
  });

  it('create component and load the saved searches', (donee) => {
    setTimeout(() => {
      expect(component.savedSearches.length).toBeGreaterThan(0);
      fixture.detectChanges();
      donee();
    }, 0);
  });

  it('Error in request ', (done) => {
    spyOn(MockSearchService.prototype, 'getSavedSearches').and.callFake(() => {
      return of({
        data: [], state: false,
        message: { success: 'NoData', errors: [{ message: 'Invalid Request' }] }
      });
    });
    component.onTabChange({ index: 1 });
    setTimeout(() => {
      expect(component.savedSearches.length).toEqual(0);
      fixture.detectChanges();
      done();
    }, 0);
  });

  it('Server error while loading searches', (done) => {
    spyOn(MockSearchService.prototype, 'getSavedSearches').and.callFake(() => throwError('SERVER DOWN!!!!'));
    component.onTabChange({ index: 1 });
    setTimeout(() => {
      expect(component.savedSearches.length).toEqual(0);
      fixture.detectChanges();
      done();
    }, 0);
  });

  it('if user selects a search and clicks can apply the searchresults', (donee) => {
    setTimeout(() => {
      expect(component.savedSearches.length).toBeGreaterThan(0);
      fixture.detectChanges();
      fixture.debugElement.query(
        By.css('mat-radio-group')).triggerEventHandler('change', { value: '2a35ff1b-0a56-485c-b3c4-d0377a7f91c6' });
      fixture.detectChanges();
      component.searchResults = [];
      expect(component.currentSelectedSearch).toEqual('2a35ff1b-0a56-485c-b3c4-d0377a7f91c6');
      fixture.debugElement.queryAll(By.css('.prospect-button'))[1].nativeElement.click();
      expect(component.searchResults.length).toBeGreaterThan(0);
      donee();
    }, 0);
  });

  it('delete the saved search', (donee) => {
    setTimeout(() => {
      expect(component.savedSearches.length).toBeGreaterThan(0);
      fixture.detectChanges();
      fixture.debugElement.queryAll(
        By.css('mat-radio-group'))[0].triggerEventHandler('change', { value: '2a35ff1b-0a56-485c-b3c4-d0377a7f91c6' });
      fixture.detectChanges();
      fixture.debugElement.query(By.css('mat-icon[svgIcon="delete"]')).triggerEventHandler('click', null);
      spyOn(MockSearchService.prototype, 'deleteSearch').and.callFake(() => {
        return of(`{
          "state": false,
          "message": {
            "success": "",
            "errors": [
              {
                "message": "Unable to delete query now:Please try again later"
              }
            ]
          }
        }`);
      });
      fixture.debugElement.queryAll(
        By.css('mat-radio-group'))[0].triggerEventHandler('change', { value: '2a35ff1b-0a56-485c-b3c4-d0377a7f91c6' });
      fixture.detectChanges();
      fixture.debugElement.query(By.css('mat-icon[svgIcon="delete"]')).triggerEventHandler('click', null);
      expect(MockSearchService.prototype.deleteSearch).toHaveBeenCalled();
      donee();
    }, 0);
  });

});

