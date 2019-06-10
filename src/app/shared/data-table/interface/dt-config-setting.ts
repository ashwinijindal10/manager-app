export interface DtConfigSetting {
  search?: true | false;
  isPaging?: true | false;
  isServerPaging?: true | false;
  pagesize?: Array<number>;
  isSorting?: true | false;
  serverPagination?: true | false | string;
}
