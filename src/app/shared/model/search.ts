export interface SearchData {
  city: string;
  country: string;
  countryCode: string;
  formattedName: string;
  latitude: number;
  longitude: number;
  postalCode: any;
  state: string;
  term: string;
}

export interface SearchDetails {
  searchData: string | SearchData;
  type: number;
  fieldName: string;
  display: string;
}

export interface ProspectSearch {
  tenantId: number;
  orgId: number;
  searchFields: SearchDetails[];
  pageNumber: number;
  pageSize: number;
  locale: string;
  sorts: Array<{ name: string; by: string }>;
}

export interface ProspectSavedSearch {
  searchRequestId: any;
  tenantId: number;
  userId: any;
  type: string;
  searchRequest: ProspectSearch;
  createdOn: Date;
  searchName: string;
}

export enum searchIndexFields {
  CATEGORY = 'Category',
  SKILLS = 'Skills',
  LOCATION = 'Location',
  ZIP = 'Zip',
  JOB_TITLE = 'Job Title',
  REQ_NUMBER = 'Req Number'
}

export enum types {
  PROSPECT = 'Prospect',
  JOBS = 'Jobs'
}

export enum QueryBuilderTabDetails {
  CURRENT = 0,
  SAVED_SEARCH = 1
}

export enum ProspectSearchIndexFields {
  NAME = 'Name',
  CATEGORY = 'Category',
  JOB_TITLE = 'Job Title',
  COMPANY_NAME = 'Company Name',
  STATUS = 'Status',
  SKILLS = 'Skills',
  TAGS = 'Tags',
  NONE = 'None',
  LOCATION = 'Location',
  ZIP = 'Zip'
}

export enum JobSearchIndexFields {
  JOB_TITLE = 'Job Title',
  REQ_NUMBER = 'Req Number',
  LOCATION = 'Location',
  ZIP = 'Zip'
}
