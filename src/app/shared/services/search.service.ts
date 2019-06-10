import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public prospectAutoSearch$ = new Subject();
  public jobAutoSearch$ = new Subject();
  public prospectCurrentSearch$ = new Subject();
  public searchSavedJobs$ = new Subject();

  constructor(private http: HttpApiService) {}

  // Prospect & Job search methods
  getSearchIndexFields(type): Observable<any> {
    return this.http.getAllData(`${type}AutoComplete/IndexFields`);
  }

  loadAutoSearchResult(type, autoSearchRequest): Observable<any> {
    const { searchFields } = autoSearchRequest;
    const indexField = searchFields.map(
      searchField => searchField.fieldName
    )[0];
    return this.http.postData(
      `${type}AutoComplete/${indexField}`,
      autoSearchRequest
    );
  }

  getSearchResults(searchRequest): Observable<any> {
    return this.http.postData('Prospect/Search', searchRequest);
  }

  getSavedSearches({ userId, type }): Observable<any> {
    return this.http.getAllData(`User/${userId}/UserSavedSearch/${type}`);
  }

  saveSearch(saveRequest): Observable<any> {
    return this.http.postData('User/UserSavedSearch', saveRequest);
  }

  deleteSearch(searchRequestId): Observable<any> {
    return this.http.deleteData(`User/UserSavedSearch/${searchRequestId}`);
  }

  // Get current position & company name for prospect list view & saved canidates in job detail view
  getCurrentPositionAndCompanyName(basicInfo) {
    let currentPositionAndCompany = '';
    if (basicInfo) {
      const { currentPosition, companyName } = basicInfo;
      if (this.trimValue(currentPosition)) {
        currentPositionAndCompany = currentPosition;
      }
      if (this.trimValue(companyName)) {
        currentPositionAndCompany = `Current Position at ${companyName}`;
      }
      if (this.trimValue(currentPosition) && this.trimValue(companyName)) {
        currentPositionAndCompany = `${currentPosition} at ${companyName}`;
      }
    }
    return currentPositionAndCompany;
  }

  // Get locations in 'city, state, country' format
  getFormattedLocations(address) {
    let result = '';
    const { country } = address;
    if (this.checkForCountryCode(country)) {
      result = this.getProspectLocation(address);
    } else {
      const location = this.getProspectLocation(address);
      if (this.trimValue(country)) {
        result = country;
      }
      if (this.trimValue(location)) {
        result = location;
      }
      if (this.trimValue(country) && this.trimValue(location)) {
        result = `${location}, ${country}`;
      }
    }
    return result;
  }

  getProspectLocation(address) {
    let homeLocation = '';
    const { city, state } = address;
    if (this.trimValue(city)) {
      homeLocation = `${city}`;
    }
    if (this.trimValue(state)) {
      homeLocation = `${state}`;
    }
    if (this.trimValue(city) && this.trimValue(state)) {
      homeLocation = `${city}, ${state}`;
    }
    return homeLocation;
  }

  trimValue(value) {
    return value && value.trim();
  }

  checkForCountryCode(country) {
    if (country) {
      const trimmedValue = country.trim().toLowerCase();
      if (
        trimmedValue === 'united states' ||
        trimmedValue === 'us' ||
        trimmedValue === 'usa'
      ) {
        return true;
      }
    }
    return false;
  }

  getLocationAndCategoryInterests(talentCommunityProfile) {
    const talentCommunityProfileData = {
      locationInterests: [],
      categoryInterests: []
    };
    if (talentCommunityProfile && talentCommunityProfile.length > 0) {
      talentCommunityProfile.map(talent => {
        if (talent.addresses && talent.addresses.length > 0) {
          talent.addresses.map(address => {
            talentCommunityProfileData.locationInterests.push(
              this.getFormattedLocations(address)
            );
          });
        }
        if (talent.jobCategories && talent.jobCategories.length > 0) {
          talent.jobCategories.map(categories => {
            talentCommunityProfileData.categoryInterests.push(categories);
          });
        }
      });
    }
    return talentCommunityProfileData;
  }

  // Get home location for prospect list view & saved canidates in job detail view
  getHomeLocation(addresses) {
    let homeLocation = '';
    if (addresses && addresses.length > 0) {
      const address = addresses[0];
      const result = this.getFormattedLocations(address);
      homeLocation = result ? `From ${result}` : '';
    }
    return homeLocation;
  }
}
