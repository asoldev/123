export interface ApiResponse<T> {
    data: T;
    message: string;
    status?: string;
  }

  export interface UserLogin {
    role: string,
    id: number,
    userName: string,
    tokenType: string,
    token: string
  }

  export interface CriteriaReport {
    total: number,
    done: number,
    notDone: number
  }
  
  export interface ResponsePagination<T> {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: T;
  }
  