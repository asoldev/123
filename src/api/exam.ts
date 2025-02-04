import { createAPIEndpoint } from "./config";
import axiosInstance from "../admin/axiosConfig";
import { ApiResponse } from "../admin/types/api";
import { SubmitExamParams, DoExamParams } from "./types/exam";

export const postEndpoint = "exam";

export const getExam = async () => {
  const response = await fetch(
    createAPIEndpoint(
      `${postEndpoint}/home-page`
    )
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};

export const getExamDetail = async (id: string): Promise<any> => {
  const response = await fetch(
    createAPIEndpoint(`${postEndpoint}/home/detail?id=${id}`)
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};

export const getExamHistory = async (id: string): Promise<any> => {
  const response = await fetch(
    createAPIEndpoint(`${postEndpoint}/home/history?userExamId=${id}`)
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};

export const getCityHamlet = async (): Promise<any> => {
  const response = await fetch(
    createAPIEndpoint(`city/hamlet?cityRole=ROLE_HAMLET&cityId=729&filterId=8`)
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};

export const postTest = async (
  data: SubmitExamParams
): Promise<ApiResponse<SubmitExamParams>> => {
  try {
    const url = `/exam/home/submit-exam`;
    const response = await axiosInstance.post<ApiResponse<SubmitExamParams>>(
      url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting exam:", error);
    throw error;
  }
};

export const postDoExam = async (
  data: DoExamParams
): Promise<ApiResponse<any>> => {
  try {
    const url = `/exam/home/do-exam`;
    const response = await axiosInstance.post<ApiResponse<any>>(
      url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error calling do-exam API:", error);
    throw error;
  }
};