import axiosInstance from '../axiosConfig';
import { ResponsePagination } from '../types/api';
import { listCertificate } from "../types/certificate";

export const getCertificateList = async (params: URLSearchParams): Promise<ResponsePagination<listCertificate[]>> => {
  try {
    const url = `/certificate/list?${params.toString()}`;
    
    const response = await axiosInstance.get<ResponsePagination<listCertificate[]>>(url);
    return response.data; 
  } catch (error) {
    console.error('Error fetching criteria search:', error);
    throw error; 
  }
};

export const getStatistics = async () => {
  try {
    const url = `/exam/statistics`
    const response = await axiosInstance.get(url);
    return response.data; 
  } catch (error) {
    console.error('Error update done job:', error);
    throw error; 
  }
}