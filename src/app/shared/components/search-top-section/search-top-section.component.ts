import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { MatAutocompleteTrigger, MatDialog } from '@angular/material';
import { SearchService } from '../../services/search.service';
import {
  switchMap,
  debounceTime,
  tap,
  distinctUntilChanged,
  catchError
} from 'rxjs/operators';
import {
  ProspectSearch,
  SearchDetails,
  SearchData,
  searchIndexFields,
  types
} from '../../model/search';
import { SearchSaveDialogComponent } from '../search-save-dialog/search-save-dialog.component';
import { of } from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-search-top-section',
  templateUrl: './search-top-section.component.html',
  styleUrls: ['./search-top-section.component.scss']
})
export class SearchTopSectionComponent implements OnInit {
  selectable = true;
  removable = true;
  isLoading = false;
  isSearchChipFormed = false;
  savedSearch = false;
  isSelected = false;
  isSaveIconVisible = false;
  isSubscribed = false;
  isSearchIconDisabled = false;

  searchTerm: string;
  category: string;
  field: string;

  scrollPosition = 0;

  error: { isError: boolean; message: string } = {
    isError: false,
    message: ''
  };
  prospectSearchData: ProspectSearch = {
    tenantId: 0,
    orgId: 1,
    searchFields: [],
    pageNumber: 1,
    pageSize: 100,
    locale: 'en',
    sorts: []
  };

  searchOptions: string[];
  searchResults: Array<SearchDetails> = [];
  locationSearchResults: Array<SearchData> = [];
  zipSearchResults: Array<SearchData> = [];
  searchIndexFields: Array<{ key: number; value: string }> = [];

  @ViewChild('autoCompleteTrigger') autoCompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  @Input() type: string;
  @Output() searchProspect = new EventEmitter();
  @Output() searchJobs = new EventEmitter();

  constructor(
    private api: SearchService,
    public dialog: MatDialog,
    private alert: AlertService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const prospectSearch$ = this.isProspectType
      ? this.api.prospectAutoSearch$
      : this.api.jobAutoSearch$;
    this.api.getSearchIndexFields(this.type).subscribe(response => {
      const {
        data,
        state,
        message: { success, errors }
      } = response;
      if (state) {
        this.searchIndexFields = data;
        this.searchOptions = this.getSearchIndexFields();
      } else if (errors && errors.length > 0) {
        const errorMessage = errors[0].message;
        this.alert.error(errorMessage);
      }
    });

    prospectSearch$
      .asObservable()
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.isLoading = true)),
        switchMap(request =>
          this.api.loadAutoSearchResult(this.type, request).pipe(
            catchError(error => {
              this.isLoading = false;
              return of(null);
            })
          )
        )
      )
      .subscribe(
        response => {
          if (response && this.isSubscribed) {
            const {
              data,
              state,
              message: { errors }
            } = response;
            if (state && data) {
              if (this.category === searchIndexFields.LOCATION) {
                this.locationSearchResults = data.records;
                this.searchOptions = this.locationSearchResults.map(
                  result => result.formattedName
                );
              } else if (this.category === searchIndexFields.ZIP) {
                this.zipSearchResults = data.records;
                this.searchOptions = this.zipSearchResults.map(
                  result => result.formattedName
                );
              } else {
                this.searchOptions = data.records;
              }
            } else if (errors && errors.length > 0) {
              const errorMessage = errors[0].message;
              this.alert.error(errorMessage);
            }
            this.isLoading = false;
          } else {
            this.searchOptions = [];
            this.isLoading = false;
          }
        },
        err => {
          this.isLoading = false;
        }
      );
  }

  showdiv() {
    this.savedSearch = true;
  }

  closeDiv() {
    this.savedSearch = false;
  }

  saveDialog() {
    const dialogRef = this.dialog.open(SearchSaveDialogComponent, {
      width: '30%',
      hasBackdrop: true,
      data: {
        searchResults: this.searchResults,
        prospectSearchData: this.prospectSearchData,
        type: this.isProspectType ? types.PROSPECT : types.JOBS
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isSaved) {
        this.isSaveIconVisible = false;
      }
    });
  }

  remove(searchDetails): void {
    const index = this.searchResults.lastIndexOf(searchDetails);
    if (index >= 0) {
      this.searchResults.splice(index, 1);
      this.isSaveIconVisible = false;
      this.isSearchIconDisabled = false;
    }
    this.cdRef.detectChanges();
  }

  selected({ option: { value } }): void {
    this.error.isError = false;
    this.error.message = '';
    this.isSelected = true;
    this.scrollRight();

    if (value) {
      if (
        this.isSearchChipFormed &&
        this.searchInput.nativeElement.value.includes(':')
      ) {
        let searchData;
        if (this.category === searchIndexFields.LOCATION) {
          searchData = this.locationSearchResults.find(
            search => search.formattedName === value
          );
        } else if (this.category === searchIndexFields.ZIP) {
          searchData = this.zipSearchResults.find(
            search => search.formattedName === value
          );
        } else {
          searchData = value;
        }
        this.searchResults.push({
          fieldName: this.category,
          display: value,
          type: this.getSearchIndexFieldKeyByValue(this.category),
          searchData: searchData
        });
        this.isSaveIconVisible = false;
        this.isSearchIconDisabled = false;
        this.isSearchChipFormed = false;
        this.searchInput.nativeElement.value = '';

        setTimeout(() => {
          this.scrolltoLast();
          this.searchOptions = this.getSearchIndexFields();
          this.autoCompleteTrigger.openPanel();
        }, 0);
      } else {
        this.category = value.toString();
        this.searchTerm = `${value}: `;
        this.searchInput.nativeElement.value = this.searchTerm;
        this.searchOptions = [this.category];
      }
    }
  }

  onSearchChange({ target: { value } }) {
    this.error.isError = false;
    this.error.message = '';
    const prospectSearch$ = this.isProspectType
      ? this.api.prospectAutoSearch$
      : this.api.jobAutoSearch$;
    const filterValue = value.toLowerCase().trim();
    const index = filterValue.lastIndexOf(':');
    if (index > 0) {
      const searchedWord = filterValue.substring(index + 1).trim();
      if (searchedWord.length >= 3) {
        this.isSearchChipFormed = true;
        const data =
          this.category === searchIndexFields.LOCATION ||
          this.category === searchIndexFields.ZIP
            ? {
                term: searchedWord
              }
            : searchedWord;

        const request = {
          ...this.prospectSearchData,
          searchFields: [
            {
              searchData: data,
              type: this.getSearchIndexFieldKeyByValue(this.category),
              fieldName: this.category
            }
          ]
        };

        this.isSubscribed = true;
        prospectSearch$.next(request);
      } else {
        this.isSubscribed = false;
        this.searchOptions = [];
        this.isLoading = false;
        this.autoCompleteTrigger.closePanel();
      }
    } else {
      const categories = this.getSearchIndexFields();
      this.searchOptions = categories.filter(
        search => search.toLowerCase().indexOf(filterValue) === 0
      );
    }
  }

  getSearchIndexFields(): string[] {
    return this.searchIndexFields.map(indexField => indexField.value);
  }

  getSearchIndexFieldKeyByValue(value: string): number {
    return this.searchIndexFields.find(indexField => indexField.value === value)
      .key;
  }

  search() {
    this.autoCompleteTrigger.closePanel();
    if (this.isProspectType) {
      this.searchProspect.emit(this.searchResults);
    } else {
      this.searchJobs.emit(this.searchResults);
    }
    this.isSearchIconDisabled = true;
    if (this.searchResults.length > 0) {
      this.isSaveIconVisible = true;
    }
  }

  fillSearch(formResult) {
    this.searchResults = formResult;
    this.isSaveIconVisible = false;
    this.isSearchIconDisabled = false;
    this.closeDiv();
    setTimeout(() => {
      this.scrolltoLast();
      this.searchInput.nativeElement.focus();
      // this.autoCompleteTrigger.closePanel();
    }, 0);
  }

  scrollRight() {
    this.scrollPosition = this.scrollPosition + document.getElementsByClassName('wrapper')[0].clientWidth;
    if (
      this.scrollPosition >
      document.getElementsByClassName('wrapper')[0].scrollWidth
    ) {
      this.scrollPosition = document.getElementsByClassName(
        'wrapper'
      )[0].scrollWidth;
    }
    document.getElementsByClassName(
      'wrapper'
    )[0].scrollLeft = this.scrollPosition;
  }

  scrollLeft() {
    this.scrollPosition = this.scrollPosition - document.getElementsByClassName('wrapper')[0].clientWidth;
    if (this.scrollPosition < 0) {
      this.scrollPosition = 0;
    }
    document.getElementsByClassName(
      'wrapper'
    )[0].scrollLeft = this.scrollPosition;
  }

  scrolltoLast() {
    this.scrollPosition = document.getElementsByClassName(
      'wrapper'
    )[0].scrollWidth;
    document.getElementsByClassName(
      'wrapper'
    )[0].scrollLeft = this.scrollPosition;
  }

  clearSearch() {
    this.searchResults = [];
    this.isSearchChipFormed = false;
    this.isSaveIconVisible = false;
    this.isSearchIconDisabled = false;
    this.searchInput.nativeElement.value = '';
    this.category = '';
    this.searchTerm = '';
    this.error.isError = false;
    this.error.message = '';
    this.scrollPosition = 0;
    this.searchOptions = this.getSearchIndexFields();
    this.search();
  }

  showError() {
    const input = this.searchInput.nativeElement.value;
    if (input.length > 0) {
      if (input.lastIndexOf(':') === -1) {
        this.category = '';
      }
      this.error.isError = true;
      const afterColon = input.substring(input.lastIndexOf(':') + 1).trim();
      this.error.message = `Please complete the search criteria [${this
        .category || 'Index Label'} : ${afterColon || 'Value'}]`;
    } else {
      this.error.isError = false;
      this.error.message = '';
    }
  }

  resetScroll() {
    this.scrollPosition = 0;
  }

  searchData(event) {
    if (event.type === 'keyup' && !this.isSelected) {
      this.showError();
      if (!this.error.isError) {
        this.search();
      }
    }
    this.isSelected = false;
  }

  get showSaveIcon() {
    if (this.searchResults) {
      return (
        this.searchResults.length > 0 &&
        this.isSaveIconVisible &&
        !this.error.isError
      );
    }
    return false;
  }

  get isProspectType() {
    return this.type === types.PROSPECT;
  }
  get ShowArrows() {
    return (
      this.searchResults.length > 0 ||
      this.searchInput.nativeElement.value ||
      this.autoCompleteTrigger.panelOpen
    );
  }
}
