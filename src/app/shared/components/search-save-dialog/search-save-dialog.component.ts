import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProspectSavedSearch } from '../../model/search';
import { FormControl, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-search-save-dialog',
  templateUrl: './search-save-dialog.component.html',
  styleUrls: ['./search-save-dialog.component.scss']
})
export class SearchSaveDialogComponent implements OnInit {
  isSearchSaveLoading = false;
  isSaveButtonDisabled = false;

  errorMessage = '';

  searchQueryName = new FormControl('');

  prospectSavedSearch: ProspectSavedSearch;

  constructor(
    private api: SearchService,
    private dialogRef: MatDialogRef<SearchSaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alert: AlertService
  ) {}

  ngOnInit() {}

  onSearchQueryChange() {
    this.errorMessage = '';
  }

  saveSearch() {
    if (this.searchQueryName.value) {
      const { prospectSearchData, searchResults, type } = this.data;
      const request = {
        ...this.prospectSavedSearch,
        searchRequest: {
          ...prospectSearchData,
          searchFields: searchResults
        },
        type: type,
        userId: 1,
        searchName: this.searchQueryName.value
      };
      this.isSearchSaveLoading = true;
      this.api.saveSearch(request).subscribe(
        response => {
          const {
            state,
            message: { success, errors }
          } = response;
          if (state) {
            this.errorMessage = '';
            this.alert.success(success);
            this.dialogRef.close({ isSaved: state });
          } else if (errors && errors.length > 0) {
            this.errorMessage = errors[0].message;
          }
          this.isSearchSaveLoading = false;
        },
        err => {
          this.isSearchSaveLoading = false;
          this.dialogRef.close();
        }
      );
    } else {
      this.errorMessage = 'Please enter a query name';
    }
  }

  closeSearch() {
    this.dialogRef.close();
  }

  get isSaveIconDisabled() {
    return this.errorMessage !== '';
  }
}
