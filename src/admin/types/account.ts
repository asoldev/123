import { ROLE } from "./enum";

export interface AccountSearchParams {
  name?: string;
  month: number;
  year: number;
  page: number;
  size: number;
}

export interface AccountResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: IAccount[];
}

export interface ICreateAccount {
  account: IAccount;
  avatar: File;
}

export interface IUpdateAccount {
  account: IAccount;
  avatar: File;
}
export interface IAccount {
  id: string;
  name: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  role: ROLE;
  roleId: number | string;
  title: string;
}
export interface ICreateAccountResponse {
  role: ROLE;
  id: number;
  userName: string;
  tokenType: string;
  token: string;
}

export interface IAccountDetail {
  id: number;
  username: string;
  phone: string;
  name: string;
  role: ROLE;
  roleId: string;
  title: string;
  deleted: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileAvatar: any;
}
