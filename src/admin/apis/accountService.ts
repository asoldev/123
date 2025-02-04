import axiosInstance from '../axiosConfig';
import { IAccountDetail, ICreateAccount, ICreateAccountResponse, IUpdateAccount } from '../types/account';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAccount = async (data: ICreateAccount): Promise<ICreateAccountResponse> => {
  try {
    const formData = new FormData();
    formData.append('account', JSON.stringify(data.account))
    if(data.avatar){
      formData.append("avatar", data.avatar); 
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axiosInstance.post<ICreateAccountResponse>('/account/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error login:', error);
    throw error; 
  }
};

export const updateAccount = async (data: IUpdateAccount): Promise<ICreateAccountResponse> => {
  try {
    const formData = new FormData();
    formData.append('account', JSON.stringify(data.account))
    if(data.avatar){
      formData.append("avatar", data.avatar); 
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axiosInstance.put<ICreateAccountResponse>('/account/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error login:', error);
    throw error; 
  }
};

export const getAccountDetail  = async (id: string): Promise<IAccountDetail> => {
  try {
    const url = `/account/detail?accountId=${id}`;
    
    const response = await axiosInstance.get<IAccountDetail>(url);
    return response.data; 
  } catch (error) {
    console.error('Error fetching account search:', error);
    throw error; 
  }
};

export const deleteAccount = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/account/${id}`);
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;  // Optionally, handle the error as needed
  }
};