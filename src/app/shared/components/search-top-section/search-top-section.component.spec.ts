import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTopSectionComponent } from './search-top-section.component';
import { MaterialModule } from '../../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SearchService } from '../../services/search.service';
import { Observable, Subject, of } from 'rxjs';
import { SearchSaveDialogComponent } from '../search-save-dialog/search-save-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatStepperModule, MatFormFieldModule, MatCheckboxModule, MatInputModule,
   MatButtonModule, MatDialogModule, MatSelectModule, MatProgressBarModule, MatCardModule, MatIconModule } from '@angular/material';

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
    'count': 4,
    'totalCount': 15,
    'records': [
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'IN', countryCode: 'IN', formattedName: 'Loc1', state: '', postalCode: '', latitude: 17, longitude: 75, locationId: 1 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'IN', countryCode: 'IN', formattedName: 'Loc2', state: null, 'city': null, postalCode: '', latitude: 17, longitude: 75, locationId: 2 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'US', countryCode: 'US', formattedName: 'Loc3', state: '', postalCode: '', latitude: 17, longitude: 75, locationId: 3 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'US', countryCode: 'US', formattedName: 'Loc5', state: '', 'city': 'INn Trail', postalCode: '', latitude: 17, longitude: 75, locationId: 5 }]
  },
  state: true, 'message': { 'success': 'Location Listed Successfully', 'errors': [] }
};

const zipMockResultsData = {
  data:
  {
    'count': 4, 'totalCount': 8,
    'records': [
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'India', 'countryCode': 'IN', formattedName: 'Kolkata,West Bengal,India,700014', state: 'West Bengal', 'city': 'Kolkata', postalCode: '700014', latitude: 22.5626, longitude: 88.363, 'locationId': 1275004 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'United States', 'countryCode': 'US', formattedName: 'Metairie,Louisiana,United States,70004', state: 'Louisiana', 'city': 'Metairie', postalCode: '70004', latitude: 29.9841, longitude: -90.1529, 'locationId': 4333177 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'India', 'countryCode': 'IN', formattedName: 'Howrah,West Bengal,India,700070', state: 'West Bengal', 'city': 'Howrah', postalCode: '700070', latitude: 22.588, longitude: 88.3185, 'locationId': 1270396 },
      // tslint:disable-next-line: max-line-length
      { term: null, country: 'Japan', 'countryCode': 'JP', formattedName: 'Okayama,Okayama,Japan,700-0942', state: 'Okayama', 'city': 'Okayama', postalCode: '700-0942', latitude: 34.6288, longitude: 133.9278, 'locationId': 1854383 }]
  },
  state: true, 'message': { 'success': 'Zip Listed Successfully', 'errors': [] }
};

const otherMockSearchResultsData = {
  'data': {
    'count': 4,
    'totalCount': 20,
    'records': ['One', 'Two', 'Threee', 'Four']
  },
  'state': true, 'message': { 'success': 'Others Listed Successfully', 'errors': [] }
};





class MockSearchService {
  public prospectAutoSearch$ = new Subject();
  public jobAutoSearch$ = new Subject();
  public prospectCurrentSearch$ = new Subject();

  getSearchIndexFields(): Observable<any> {
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
  loadAutoSearchResult(autoSearchRequest): Observable<any> {
    const { searchFields } = autoSearchRequest;
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

  getSearchResults(): Observable<any> {
    return of(mocksearchResultsData);
  }

  getSavedSearches(): Observable<any> {
    return;
  }

  saveSearch(): Observable<any> {
    return;
  }

  deleteSearch(): Observable<any> {
    return;
  }

}

describe('SearchTopSectionComponent', () => {
  let component: SearchTopSectionComponent;
  let template: DebugElement;
  let fixture: ComponentFixture<SearchTopSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        FormsModule,
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
      declarations: [SearchTopSectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: SearchService, useClass: MockSearchService }]
    }).compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SearchSaveDialogComponent],
      },
    });
  }));

  beforeEach(() => {
    // spyOn(SearchTopSectionComponent.prototype, 'ngOnInit').and.callFake(() => {
    //   const searchService = new MockSearchService();
    //   searchService.getSearchIndexFields('ANY').subscribe(response => {
    //     const {
    //       data,
    //       state,
    //       message: { success, errors }
    //     } = response;
    //     if (state) {
    //       component.searchIndexFields = data;
    //       component.searchOptions = component.getSearchIndexFields();
    //     }
    //   });
    // });
    fixture = TestBed.createComponent(SearchTopSectionComponent);
    template = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load intial suggestions', () => {
    expect(component.searchOptions.length).toBeGreaterThan(0);
  });

  it('search icon should be enabled when the component loads', () => {
    fixture.detectChanges();
    expect(template.query(By.css('mat-icon[svgIcon=search]')).nativeNode.classList.value).toContain('icon-blue');
  });

  it('click on filter icon popup appears', () => {
    spyOn(component, 'showdiv');
    fixture.nativeElement.querySelector('mat-icon[svgIcon=filter]').click();
    expect(component.showdiv).toHaveBeenCalled();
  });

  it('click on Search then Api call is made ', () => {
    fixture.debugElement.query(By.css('p mat-icon[svgIcon=search]')).nativeElement.click();
    fixture.detectChanges();
    component.type = 'Prospect';
    component.searchResults = [{ searchData: 'Mock', type: 2, fieldName: 'Category', display: 'MockResult' }];
    fixture.detectChanges();
    fixture.debugElement.query(By.css('p mat-icon[svgIcon=search]')).nativeElement.click();
    spyOn(component, 'search');
    fixture.debugElement.query(By.css('p mat-icon[svgIcon=search]')).nativeElement.click();
    expect(component.search).toHaveBeenCalled();
  });

  it('click on clear', () => {
    spyOnProperty(component, 'ShowArrows').and.returnValue(true);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').click();
    fixture.nativeElement.querySelector('span mat-icon[svgIcon=close]').click();
    expect(fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value).toEqual('');
  });

  it('close the popup on clicking X ', () => {
    fixture.nativeElement.querySelector('mat-icon[svgIcon=filter]').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.savedSearch mat-icon[svgIcon=close]').click();
    fixture.detectChanges();
    expect(component.savedSearch).toBeFalsy();
  });

  it('click on save icon should not be visible at the start', () => {
    expect(fixture.nativeElement.querySelector('mat-icon[svgIcon=floppy]')).toBeNull();
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

  it('Retrieve autosearch data for Zip', async(async () => {
    component.category = 'Zip';
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').click();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = 'Zip:70';
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = 'Zip:709';
    fixture.detectChanges();
    // tslint:disable-next-line: max-line-length
    component.onSearchChange({ target: { value: fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value } });
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
      console.log(component.searchOptions);
    });
    console.log(component.searchOptions);
    expect(component.searchOptions.length).toBeGreaterThan(0);
  }));

  it('Retrieve autosearch data for Location', () => {
    component.category = 'Location';
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').click();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = 'Location:70';
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = 'Location:Ind';
    fixture.detectChanges();
    // tslint:disable-next-line: max-line-length
    component.onSearchChange({ target: { value: fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value } });
    console.log(component.searchOptions);
    expect(component.searchOptions.length).toBeGreaterThan(0);
  });

  // it('click on SaveIcon ', () => {
  //   spyOnProperty(component, 'showSaveIcon').and.returnValue(true);
  //   fixture.detectChanges();
  //   fixture.debugElement.query(By.css('p mat-icon[svgIcon=floppy]')).nativeElement.click();
  //   component.type = 'Prospect';
  //   fixture.debugElement.query(By.css('p mat-icon[svgIcon=floppy]')).nativeElement.click();
  //   spyOn(component, 'saveDialog');
  //   fixture.debugElement.query(By.css('p mat-icon[svgIcon=floppy]')).nativeElement.click();
  //   expect(component.saveDialog).toHaveBeenCalled();
  // });

  it('removing a chip formed from the results', () => {
    component.searchResults = [{ searchData: 'Mock', type: 2, fieldName: 'Category', display: 'MockResult' }];
    fixture.detectChanges();
    fixture.debugElement.query(By.css('mat-chip mat-icon[svgIcon=close]')).nativeElement.click();
    expect(component.searchResults.length).toEqual(0);
  });

  it('geting search results from app-query-builder', () => {
    // tslint:disable-next-line: max-line-length
    const formResult = [{ searchData: 'Mock', type: 2, fieldName: 'Category', display: 'MockResult' }, { searchData: 'Mock2', type: 2, fieldName: 'Category', display: 'MockResult2' }];
    component.fillSearch(formResult);
    expect(component.searchResults.length).toBeGreaterThan(0);
  });

  it('scrolling to the end', () => {
    // tslint:disable-next-line: max-line-length
    const formResult = [{ searchData: 'Mock', type: 2, fieldName: 'Category', display: 'MockResult' }, { searchData: 'Mock3', type: 2, fieldName: 'Category', display: 'MockResult3' }, { searchData: 'Mock2', type: 2, fieldName: 'Category', display: 'MockResult2' }];
    component.fillSearch(formResult);
    fixture.detectChanges();
    fixture.debugElement.query(By.css('span mat-icon[svgIcon=chevronright]')).nativeElement.click();
    expect(component.scrollPosition).toBeGreaterThan(0);
  });

  it('scrolling to the start', () => {
    // tslint:disable-next-line: max-line-length
    const formResult = [{ searchData: 'Mock', type: 2, fieldName: 'Category', display: 'MockResult' }, { searchData: 'Mock3', type: 2, fieldName: 'Category', display: 'MockResult3' }, { searchData: 'Mock2', type: 2, fieldName: 'Category', display: 'MockResult2' }];
    component.fillSearch(formResult);
    fixture.detectChanges();
    fixture.debugElement.query(By.css('span mat-icon[svgIcon=chevronright]')).nativeElement.click();
    fixture.debugElement.query(By.css('span mat-icon[svgIcon=chevronleft]')).nativeElement.click();
    expect(component.scrollPosition).toEqual(0);
  });

  it('check for error message', () => {
    component.category = 'Location';
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').click();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = 'Location:Ind';
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').blur();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').click();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = 'Thanooz';
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').blur();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').click();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = null;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').blur();
    fixture.detectChanges();
  });

  it('Select from options', () => {
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').click();
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = 'Location';
    fixture.detectChanges();
    // tslint:disable-next-line: max-line-length
    // component.onSearchChange({ target: { value: fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value } });
    fixture.detectChanges();
    console.log(template.queryAll(By.css('mat-option')));
    template.queryAll(By.css('mat-option'))[0].nativeElement.click();
    // tslint:disable-next-line: max-line-length
    component.selected({ option: { value: fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value } });
    fixture.detectChanges();
    component.isSearchChipFormed = true;

    // tslint:disable-next-line: max-line-length
    fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value = fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value + ': 09e';
    component.selected({ option: { value: fixture.nativeElement.querySelector('.search-full-width mat-chip-list div input').value } });
    fixture.detectChanges();
    console.log(template.queryAll(By.css('mat-option')));
    template.queryAll(By.css('mat-option'))[0].nativeElement.click();
    fixture.detectChanges();

  });

});
