export type PagedResult<T> = {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
};

export type SearchRequest = {
  [key: string]: any;
  keyword: string | null;
  pageIndex: number;
  pageSize: number;
};
