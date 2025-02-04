import axiosInstance from '../axiosConfig';
import { UserLogin } from '../types/api';

export const postLogin = async (email: string, password: string): Promise<UserLogin> => {
  try {
    const response = await axiosInstance.post<UserLogin>('/account/login', {username: email, password});
    return response.data; 
  } catch (error) {
    console.error('Error login:', error);
    throw error; 
  }
};
