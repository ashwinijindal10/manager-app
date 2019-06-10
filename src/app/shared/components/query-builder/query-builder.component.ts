import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError
} from 'rxjs/operators';

import {
  SearchDetails,
  ProspectSearch,
  ProspectSavedSearch,
  SearchData,
  searchIndexFields,
  types,
  QueryBuilderTabDetails,
  ProspectSearchIndexFields,
  JobSearchIndexFields
} from '../../model/search';
import { SearchService } from '../../services/search.service';
import { AlertService } from '../..//services/alert.service';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {
  @Input() searchResults: Array<SearchDetails>;
  @Input() searchIndexFields;
  @Output() submitForm = new EventEmitter();
  @Output() closePopup = new EventEmitter();

  isLoading = false;
  isSaveLoading = false;
  isSubscribed = false;
  isSelected = false;

  currentValue = '';
  currentSelectedSearch = '';
  searchIndexField = '';
  delimiter = ';';
  defaultErrorMessage = 'Please complete the search criteria';

  fieldIndex = 0;
  selectedTabIndex = QueryBuilderTabDetails.CURRENT;

  prospectSearchData: ProspectSearch = {
    tenantId: 0,
    orgId: 1,
    searchFields: [],
    pageNumber: 1,
    pageSize: 100,
    locale: 'en',
    sorts: []
  };

  displayedColumns: string[] = ['select', 'searchName', 'createdOn', 'delete'];
  currentSearchDetails = new FormArray([]);
  searchOptions = [];
  formFields = [];
  searchCategories = [];
  errors = [];
  locationSearchResults: Array<SearchData> = [];
  zipSearchResults: Array<SearchData> = [];
  savedSearches: Array<ProspectSavedSearch>;
  userSearches: Array<object>;
  indexFields = [];

  @Input() type: string;

  @ViewChildren('queryBuilderSearch') queryBuilderSearch: QueryList<ElementRef>;

  constructor(private api: SearchService, private alert: AlertService) {}

  ngOnInit() {
    const prospectSearchIndexFields = Object.keys(
      ProspectSearchIndexFields
    ).map(
      prospectSearchIndexField =>
        ProspectSearchIndexFields[prospectSearchIndexField]
    );
    const jobSearchIndexFields = Object.keys(JobSearchIndexFields).map(
      jobSearchIndexField => JobSearchIndexFields[jobSearchIndexField]
    );
    this.searchCategories =
      this.type === types.PROSPECT
        ? prospectSearchIndexFields
        : jobSearchIndexFields;

    const initialData = this.getInitialDataOfQueryBuilder();
    this.indexFields =
      initialData && initialData.filter(value => value !== null);

    if (this.isProspectType) {
      this.selectedTabIndex = QueryBuilderTabDetails.CURRENT;
      this.loadDatainForm();
      this.loadAutoSearchResults();
    } else {
      this.selectedTabIndex = QueryBuilderTabDetails.SAVED_SEARCH;
      this.getUserSavedSearch();
    }
  }

  loadAutoSearchResults() {
    this.api.prospectCurrentSearch$
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
              message: { success, errors }
            } = response;
            if (state && data) {
              if (this.searchIndexField === searchIndexFields.LOCATION) {
                this.locationSearchResults = data.records;
                this.searchOptions = this.locationSearchResults.map(
                  result => result.formattedName
                );
              } else if (this.searchIndexField === searchIndexFields.ZIP) {
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
        err => (this.isLoading = false)
      );
  }

  getInitialDataOfQueryBuilder() {
    let result = {};
    return this.searchCategories.map((searchCategory, index) => {
      this.currentSearchDetails.controls.push(new FormControl(''));
      this.formFields[index] = '';
      if (index % 2 === 0) {
        result = {
          ...result,
          leftIndex: index,
          leftValue: searchCategory,
          isLeftValueDisabled:
            this.getSearchIndexFields().indexOf(searchCategory) === -1
        };
      } else {
        result = {
          ...result,
          rightIndex: index,
          rightValue: searchCategory,
          isRightValueDisabled:
            this.getSearchIndexFields().indexOf(searchCategory) === -1
        };
        return result;
      }
      return null;
    });
  }

  // Instantiates the form controls also fills the form with the data recieved from serach bar chips
  loadDatainForm() {
    if (this.searchResults) {
      this.searchResults.map(searchResult => {
        const index = this.searchCategories.indexOf(searchResult.fieldName);
        if (this.currentSearchDetails.controls[index].value) {
          this.currentSearchDetails.controls[index].setValue(
            `${this.currentSearchDetails.controls[index].value}; ${
              searchResult.display
            }`
          );
          this.formFields[index] = this.currentSearchDetails.controls[
            index
          ].value;
        } else {
          this.currentSearchDetails.controls[index].setValue(
            searchResult.display
          );
          this.formFields[index] = this.currentSearchDetails.controls[
            index
          ].value;
        }
      });
    }
  }

  // When an user clicks reset button in form
  resetDatainForm() {
    for (let index = 0; index < this.searchCategories.length; index++) {
      this.currentSearchDetails.controls[index].reset();
      this.formFields[index] = '';
    }
  }

  // Sugestions given for a field (like autocomplete)
  showSuggestions({ target: { value } }, indexField) {
    if (
      this.currentSearchDetails.controls[this.fieldIndex] &&
      this.currentSearchDetails.controls[this.fieldIndex].dirty
    ) {
      this.currentValue = value;
      this.fieldIndex = this.searchCategories.indexOf(indexField);
      const formValues = this.formFields[this.fieldIndex]
        .trim()
        .split(this.delimiter);
      const currentValues = this.currentSearchDetails.controls[
        this.fieldIndex
      ].value
        .trim()
        .split(this.delimiter);

      if (
        this.formFields[this.fieldIndex] !== '' &&
        currentValues.length !== formValues.length + 2
      ) {
        this.deleteEditedWord(this.fieldIndex);
      }

      const currentSearchDetail = this.currentSearchDetails.controls[
        this.fieldIndex
      ].value;
      const colonIndex = currentSearchDetail.lastIndexOf(this.delimiter);
      const searchedWord =
        colonIndex < 0
          ? currentSearchDetail.trim()
          : currentSearchDetail
              .substr(colonIndex + 1)
              .toLowerCase()
              .trim();
      this.isSelected = false;
      if (searchedWord.length >= 3) {
        const data =
          indexField === searchIndexFields.LOCATION ||
          indexField === searchIndexFields.ZIP
            ? {
                term: searchedWord
              }
            : searchedWord;
        const request = {
          ...this.prospectSearchData,
          searchFields: [
            {
              searchData: data,
              type: this.getSearchIndexFieldKeyByValue(indexField),
              fieldName: indexField
            }
          ]
        };

        this.searchIndexField = indexField;
        this.isSubscribed = true;
        this.api.prospectCurrentSearch$.next(request);
      } else {
        this.isSubscribed = false;
        this.searchOptions = [];
        this.isLoading = false;
      }
    }
  }

  // When a user clicks on a form field a semicolon is suffixed to the present form data
  insertColon(index) {
    this.searchOptions = [];
    this.fieldIndex = index;
    const currentSearchDetails = this.currentSearchDetails.controls[index]
      .value;
    const value = this.formFields[index];
    if (value) {
      if (value.trim() === currentSearchDetails.trim()) {
        this.currentSearchDetails.controls[index].setValue(
          `${currentSearchDetails.trim()}; `
        );

        // Fix - jumping of cursor issue in IE11
        const position = this.queryBuilderSearch.toArray()[index].nativeElement
          .selectionStart;
        const currentPosition =
          position + 2 ===
          this.currentSearchDetails.controls[index].value.length
            ? this.currentSearchDetails.controls[index].value.length
            : position;

        setTimeout(() => {
          if (currentPosition !== 0) {
            this.queryBuilderSearch.toArray()[
              index
            ].nativeElement.selectionStart = currentPosition;
            this.queryBuilderSearch.toArray()[
              index
            ].nativeElement.selectionEnd = currentPosition;
            this.queryBuilderSearch.toArray()[index].nativeElement.focus();
          }
        }, 0);
      }
    }
  }

  // Removes the semicolon if it was generated by insertColon
  removeTrailingColon(index: number) {
    const currentSearchDetails = this.currentSearchDetails.controls[index]
      .value;
    if (currentSearchDetails) {
      const currentSearchDetailsLength = currentSearchDetails.trim().length;
      if (
        currentSearchDetails.trim().substr(currentSearchDetailsLength - 1) ===
        this.delimiter
      ) {
        this.currentSearchDetails.controls[index].setValue(
          currentSearchDetails.substring(0, currentSearchDetailsLength - 1)
        );
      }
      if (
        currentSearchDetails.trim() !== this.delimiter &&
        this.formFields[index].trim() !==
          this.currentSearchDetails.controls[index].value.trim()
      ) {
        const currentValue = this.currentSearchDetails.controls[index].value;
        const colonIndex = currentValue.lastIndexOf(';');
        const searchedWord =
          colonIndex < 0
            ? currentValue
            : currentValue.substr(colonIndex + 1).trim();
        const errorMessage = searchedWord.trim()
          ? `${this.defaultErrorMessage} - ${searchedWord}`
          : this.defaultErrorMessage;
        this.currentSearchDetails.controls[index].setErrors({
          isError: true,
          message: errorMessage
        });
      }
    }
  }

  // Triggered when a user selects a option from the suggestions
  selectInForm({ option: { value } }) {
    this.searchOptions = [];
    if (value) {
      this.currentSearchDetails.controls[this.fieldIndex].setErrors({
        isError: false,
        message: ''
      });
      this.isSelected = true;
      this.formFields[this.fieldIndex] = this.formFields[this.fieldIndex]
        ? `${this.formFields[this.fieldIndex]}; ${value}`
        : value;
      this.currentSearchDetails.controls[this.fieldIndex].setValue(
        `${this.formFields[this.fieldIndex]}; `
      );
    } else {
      this.currentSearchDetails.controls[this.fieldIndex].setValue(
        this.currentValue
      );
    }
  }

  // When a user clicks on cancel button
  ClosePopup() {
    this.closePopup.emit();
  }

  // When a user clicks on Apply button the data is tranformed into search data required by search-top-component
  submitFormData() {
    this.searchResults = [];
    this.searchCategories.map((searchCategory, index) => {
      if (this.formFields[index]) {
        const splitFormFields = this.formFields[index]
          .trim()
          .split(this.delimiter);
        splitFormFields.map(formField => {
          const regExp = /[0-9A-Za-z]/;
          if (formField && regExp.test(formField)) {
            let searchData = formField;
            if (searchCategory === searchIndexFields.LOCATION) {
              searchData = this.locationSearchResults.find(
                search => search.formattedName === formField
              );
            } else if (searchCategory === searchIndexFields.ZIP) {
              searchData = this.zipSearchResults.find(
                search => search.formattedName === formField
              );
            }

            this.searchResults.push({
              fieldName: searchCategory,
              type: this.getSearchIndexFieldKeyByValue(searchCategory),
              searchData: searchData,
              display: formField
            });
          }
        });
      }
    });
    this.submitForm.emit(this.searchResults);
  }

  getSearchIndexFields(): string[] {
    return this.searchIndexFields.map(indexField => indexField.value);
  }

  getSearchIndexFieldKeyByValue(value: string): number {
    return this.searchIndexFields.find(indexField => indexField.value === value)
      .key;
  }

  onTabChange(event) {
    this.currentSelectedSearch = '';
    this.selectedTabIndex = event.index;
    if (event.index === 1) {
      this.getUserSavedSearch();
    }
  }

  getUserSavedSearch() {
    const request = {
      userId: 1,
      type: this.isProspectType ? types.PROSPECT : types.JOBS
    };

    this.isSaveLoading = true;
    this.api.getSavedSearches(request).subscribe(
      response => {
        const {
          data,
          state,
          message: { errors }
        } = response;
        if (state) {
          this.savedSearches = data;
          this.userSearches = this.savedSearches.map(savedSearch => {
            return {
              searchRequestId: savedSearch.searchRequestId,
              searchName: savedSearch.searchName,
              createdOn: savedSearch.createdOn
            };
          });
          this.isSaveLoading = false;
        } else {
          const errorMessage = errors[0].message;
          this.isSaveLoading = false;
          this.alert.error(errorMessage);
        }
      },
      err => {
        this.isSaveLoading = false;
      }
    );
  }

  selectSearch(event: MatRadioChange) {
    const { value } = event;
    this.currentSelectedSearch = value;
  }

  applySearch() {
    const savedSearch = this.savedSearches.find(
      item => item.searchRequestId === this.currentSelectedSearch
    );
    this.searchResults = savedSearch.searchRequest.searchFields;
    this.submitForm.emit(this.searchResults);
  }

  deleteSavedSearch() {
    this.isSaveLoading = true;
    if (this.currentSelectedSearch) {
      this.api.deleteSearch(this.currentSelectedSearch).subscribe(response => {
        const {
          state,
          message: { success, errors }
        } = JSON.parse(response);
        if (state) {
          const index = this.savedSearches.findIndex(
            item => item.searchRequestId === this.currentSelectedSearch
          );
          if (index !== -1) {
            this.savedSearches.splice(index, 1);
            this.userSearches.splice(index, 1);
          }
          this.alert.success(success);
          this.isSaveLoading = false;
          this.currentSelectedSearch = '';
        } else if (errors && errors.length > 0) {
          this.alert.error(errors[0].message);
        }
      });
    }
  }

  get checkSelectionStatus() {
    if (!!this.currentSelectedSearch) {
      return false;
    }
    return true;
  }

  get checkIfDataAvailable() {
    if (this.userSearches) {
      return this.userSearches.length > 0;
    }
    return false;
  }

  get isApplyButtonDisabled() {
    let isErr = false;
    this.currentSearchDetails.controls.map(x => {
      isErr = isErr ? true : x.invalid;
    });
    return isErr;
  }

  get isProspectType() {
    return this.type === types.PROSPECT;
  }

  // checks if the user deleted a selected word
  deleteEditedWord(index) {
    const formValues = this.formFields[index].trim().split(this.delimiter);
    let valueToDisplay = '';
    if (
      this.formFields[index].trim() ===
      this.currentSearchDetails.controls[index].value.trim()
    ) {
      formValues.splice(formValues.length - 1, 1);
      formValues.map(value => (valueToDisplay += `${value};`));
      this.formFields[index] = valueToDisplay.substr(
        0,
        valueToDisplay.length - 1
      );
    } else {
      let presentValues = this.currentSearchDetails.controls[index].value
        .replace(/^\s+/g, '')
        .split(this.delimiter);
      let text = '';
      const data = this.formFields[index].trim();
      data.split('').map((formValue, i) => {
        if (
          formValue !==
            this.currentSearchDetails.controls[index].value.trim().charAt(i) &&
          formValue === this.delimiter &&
          text === ''
        ) {
          text = `${this.currentSearchDetails.controls[index].value
            .trim()
            .substr(0, i - 1)}${formValue}${this.currentSearchDetails.controls[
            index
          ].value
            .trim()
            .substr(i)}`;
        }
      });
      if (text) {
        presentValues = text.trim().split(this.delimiter);
      }
      const trimmedFormValues = formValues.map(s => s.trim());
      presentValues.map(value => {
        if (trimmedFormValues.indexOf(value.trim()) >= 0) {
          valueToDisplay += `${value};`;
        }
      });
      this.formFields[index] = valueToDisplay.substr(
        0,
        valueToDisplay.length - 1
      );
      valueToDisplay += presentValues[presentValues.length - 1];
    }
    this.currentSearchDetails.controls[index].setValue(
      valueToDisplay.replace(/^\s+/g, '')
    );
  }
}
