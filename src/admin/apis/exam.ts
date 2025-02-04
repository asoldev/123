import axiosInstance from "../axiosConfig";
import { ApiResponse, ResponsePagination } from "../types/api";
import {
  settingExamParam,
  settingExamResult,
  listExam,
  createExamParam,
  createExamResult,
  resultDetailExam,
  QuizSettingsDetailResult,
  ExamPramsTabs2,
  ExamPramsTabs2Result,
  ExamPramsCreateUpdateQuestion,
  resultDetailPost,
  certificateResult,
  certificateCreate,
  certificateUpdate,
  resultDetailCertificate,
  UpdateDataQuestion,
} from "../types/exam";

export const createSettingExam = async (
  data: settingExamParam
): Promise<ApiResponse<settingExamResult>> => {
  try {
    const url = `/quiz-setting/create`;

    const response = await axiosInstance.post<ApiResponse<settingExamResult>>(
      url,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const updateSettingExam = async (
  data: settingExamParam
): Promise<ApiResponse<settingExamResult>> => {
  try {
    const url = `/quiz-setting/create`;

    const response = await axiosInstance.post<ApiResponse<settingExamResult>>(
      url,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};
export const createExamApi = async (
  data: createExamParam
): Promise<ApiResponse<createExamResult>> => {
  try {
    const url = `/exam/create`;
    const formData = new FormData();
    formData.append("exam", JSON.stringify(data.exam));
    if (data.fileImage) {
      if (data.fileImage instanceof Blob) {
        formData.append("fileImage", data.fileImage);
      }
    }
    if (data.fileThumb) {
      if (data.fileThumb instanceof Blob) {
        formData.append("fileThumb", data.fileThumb);
      }
    }
    if (data.filesDocument) {
      if (data.filesDocument instanceof Blob) {
        formData.append("filesDocument", data.filesDocument);
      }
    }
    const response = await axiosInstance.post<ApiResponse<createExamResult>>(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};
export const updateExamApi = async (
  data: createExamParam
): Promise<ApiResponse<createExamResult>> => {
  try {
    const url = `/exam/update`;
    const formData = new FormData();
    formData.append("exam", JSON.stringify(data.exam));
    if (data.fileImage) {
      if (data.fileImage instanceof Blob) {
        formData.append("newFileImage", data.fileImage);
      }
    }
    if (data.fileThumb) {
      if (data.fileThumb instanceof Blob) {
        formData.append("newFileThumb", data.fileThumb);
      }
    }
    if (data.filesDocument) {
      if (data.filesDocument instanceof Blob) {
        formData.append("newFilesDocument", data.filesDocument);
      }
    }
    const response = await axiosInstance.put<ApiResponse<createExamResult>>(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const deleteExamApi = async (id: string | number) => {
  try {
    const url = `/exam/delete/${id}`;

    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};
export const deleteSettingExamApi = async (id: string | number) => {
  try {
    const url = `/quiz-setting/delete/${id}`;

    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};
export const deleteExamTabs2Api = async (id: string | number) => {
  try {
    const url = `/quiz/delete/${id}`;

    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};
export const getExamList = async (
  params: URLSearchParams
): Promise<ResponsePagination<listExam[]>> => {
  try {
    const url = `/exam/list?${params.toString()}`;

    const response = await axiosInstance.get<ResponsePagination<listExam[]>>(
      url
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getExamDetail = async (
  id: string | number
): Promise<resultDetailExam> => {
  try {
    const url = `/exam/detail?id=${id}`;

    const response = await axiosInstance.get<resultDetailExam>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getSettingExamDetail = async (
  id: string | number
): Promise<QuizSettingsDetailResult> => {
  try {
    const url = `/quiz-setting/detail?quizId=${id}`;

    const response = await axiosInstance.get<QuizSettingsDetailResult>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getExamDetailTabs2 = async (
  id: string | number
): Promise<ExamPramsTabs2Result> => {
  try {
    const url = `/quiz/detail?quizId=${id}`;

    const response = await axiosInstance.get<ExamPramsTabs2Result>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getHomeSearch = async (
  params: URLSearchParams
): Promise<ResponsePagination<listExam[]>> => {
  try {
    const url = `/exam/home/search?${params.toString()}`;

    const response = await axiosInstance.get<ResponsePagination<listExam[]>>(
      url
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    const url = `/exam/statistics`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error update done job:", error);
    throw error;
  }
};

export const createExamTabs2 = async (
  data: ExamPramsTabs2,
  questionsFiles: string[][]
): Promise<ApiResponse<ExamPramsTabs2>> => {
  try {
    const url = `/quiz/create`;
    const formData = new FormData();
    formData.append("quiz", JSON.stringify(data));
    questionsFiles.forEach((file: any, index) => {
      formData.append(
        `questionsFiles[${index}].questionIndex`,
        index.toString()
      );
      file.forEach((el: any, ind: number) => {
        formData.append(`questionsFiles[${index}].files[${ind}]`, el);
      });
    });

    const response = await axiosInstance.post<ApiResponse<ExamPramsTabs2>>(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating exam tabs:", error);
    throw error;
  }
};

export const updateExamTabs2Api = async (
  data: ExamPramsTabs2
): Promise<ApiResponse<ExamPramsTabs2>> => {
  try {
    const url = `/quiz/update`;

    const response = await axiosInstance.put<ApiResponse<ExamPramsTabs2>>(
      url,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const updateQuestionApi = async (
  data: UpdateDataQuestion,
  questionsFiles?: string[]
): Promise<ExamPramsCreateUpdateQuestion> => {
  try {
    const url = `/question/update`;
    const formData = new FormData();
    formData.append("question", JSON.stringify(data));
    if (questionsFiles && questionsFiles.length > 0) {
      questionsFiles.forEach((file: any) => {
        if (file.file instanceof File) {
          formData.append("newFiles", file.file);
        } else if (file instanceof File) {
          formData.append("newFiles", file);
        }
      });
    }
    const response = await axiosInstance.put<ExamPramsCreateUpdateQuestion>(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const createQuestionApi = async (
  data: ExamPramsCreateUpdateQuestion,
  questionsFiles: string[]
): Promise<ExamPramsCreateUpdateQuestion> => {
  try {
    const url = `/question/add`;
    const formData = new FormData();
    formData.append("question", JSON.stringify(data));
    if (questionsFiles && questionsFiles.length > 0) {
      questionsFiles.forEach((file: any) => {
        formData.append(`files`, file);
      });
    }
    const response = await axiosInstance.post<ExamPramsCreateUpdateQuestion>(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const deleteQuestionApi = async (id: string | number) => {
  try {
    const url = `/question/delete/${id}`;

    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getPostDetail = async (
  id: string | number
): Promise<resultDetailPost> => {
  try {
    const url = `/post/detail?id=${id}`;

    const response = await axiosInstance.get<resultDetailPost>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const createCertificate = async (
  data: certificateCreate
): Promise<ApiResponse<certificateResult>> => {
  try {
    const url = `/certificate/create`;

    const response = await axiosInstance.post<ApiResponse<certificateResult>>(
      url,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const updateCertificate = async (
  data: certificateUpdate
): Promise<ApiResponse<certificateResult>> => {
  try {
    const url = `/certificate/update`;

    const response = await axiosInstance.put<ApiResponse<certificateResult>>(
      url,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getCertificate = async (
  id: string | number
): Promise<resultDetailCertificate> => {
  try {
    const url = `/certificate/detail?certificateId=${id}`;

    const response = await axiosInstance.get<resultDetailCertificate>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};
