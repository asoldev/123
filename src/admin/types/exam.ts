export type settingExamParam = {
  blockTabCopy: boolean;
  examDuration: string;
  limitQuestion: string;
  limitRetry: number;
  maxScore: number;
  numberLimitRetry: number;
  passingScore: number;
  showCertificate: boolean;
  showResult: boolean;
  shuffle: boolean;
};
export type settingExamResult = {
  data: {
    createdUser: string | null;
    createdTime: string;
    updatedUser: string | null;
    updatedTime: string;
    id: number;
    quizId: number | null;
    examDuration: number;
    limitQuestion: number;
    maxScore: number;
    passingScore: number;
    limitRetry: number;
    showCertificate: boolean;
    showResult: boolean;
    shuffle: boolean;
    blockTabCopy: boolean;
  };
  message: string;
};

export interface listExam {
  name?: string;
  page: number;
  size: number;
}
export interface createExamResult {
  createdUser: string | null;
  createdTime: string;
  updatedUser: string | null;
  updatedTime: string;
  id: number;
  quizId: number;
  certificateId: number;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  filterId: number;
  cityRole: string;
  cityId: number;
  information: string;
}
export interface createExamParam {
  fileImage:
    | string
    | {
        uid: string;
        lastModified: number;
        lastModifiedDate: Date;
        name: string;
        size: number;
        type: string;
        webkitRelativePath: string;
      };

  fileThumb:
    | string
    | {
        uid: string;
        lastModified: number;
        lastModifiedDate: Date;
        name: string;
        size: number;
        type: string;
        webkitRelativePath: string;
      };

  filesDocument:
    | string
    | {
        uid: string;
        lastModified: number;
        lastModifiedDate: Date;
        name: string;
        size: number;
        type: string;
        webkitRelativePath: string;
      };

  exam: {
    id?: string | number | undefined;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    information: string;
    quizId: number | string | null;
  };
}

export interface resultDetailExam {
  id: number;
  quizId: number;
  certificateId: number;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  filterId: number;
  cityRole: string;
  cityId: number;
  information: string;
  status: string;
  fileImage: any | null;
  fileThumb: any | null;
  filesDocuments: Array<string>;
  quiz: number | null;
}
export interface QuizSettingsDetailResult {
  id: number;
  quizId: number;
  examDuration: number;
  limitQuestion: number;
  maxScore: number;
  passingScore: number;
  limitRetry: number;
  showCertificate: boolean;
  showResult: boolean;
  shuffle: boolean;
  blockTabCopy: boolean;
}
export interface ExamPramsTabs2 {
  id?: number | string | undefined;
  quizId?: number | string | undefined;
  name: string;
  questions?: {
    id?: number | string | undefined;
    quizId?: number | string | undefined;
    question: string;
    type: "0" | "1"; // "0" for Radio (single correct), "1" for Checkbox (multiple correct)
    questionIndex: number;
    answers: {
      answer: string;
      correct: boolean;
    }[];
  }[];
}
export interface ExamPramsCreateUpdateQuestion {
  id?: number | string | undefined;
  quizId?: number | string | undefined;
  question: string;
  type: "0" | "1"; // "0" for Radio (single correct), "1" for Checkbox (multiple correct)
  questionIndex: number;
  answers: {
    answer: string;
    correct: boolean;
  }[];
}
export interface ExamPramsTabs2Result {
  id: number;
  name: string;
  questions: {
    id: number;
    quizId: number;
    question: string;
    type: number; // Assuming type is numeric (0 or 1)
    questionIndex: number;
    files: string[]; // If there are files attached to the question, it's an array of strings
    answers: {
      id: number;
      questionId: number;
      answer: string;
      correct: boolean;
    }[];
    addAnswers: string | null; // If you have additional answers, this could be a string or null
    fileKeysDelete: string | null; // If there are file keys to delete, this could be a string or null
    answersIdDelete: number[] | null; // List of answer IDs to delete
  }[];
}
export interface QuestionResponse {
  data: {
    createdUser: number;
    createdTime: string;
    updatedUser: number | null;
    updatedTime: string | null;
    id: number;
    quizId: number;
    question: string;
    type: 0 | 1; // 0: Trắc nghiệm, 1: Hộp kiểm
    questionIndex: number;
  };
  message: string;
}

export interface resultDetailPost {
  id: number;
  title: string;
  content: string;
  file:
    | string
    | {
        id: string;
        createdUser: number;
        createdTime: Date;
        updatedUser: number;
        updatedTime: Date;
        name: string;
        entityId: number;
        type: number;
        fileKey: string;
        fileName: string;
        description: string;
        deleted: string;
      };
}

export interface certificateCreate {
  name: string;
  cerTemplateId: number;
}

export interface certificateUpdate {
  id: number;
  name: string;
  cerTemplateId: number;
}

export interface resultDetailCertificate {
  id: number;
  name: string;
  cerTemplateId: number;
  cerTemplateContent: string;
}

export type certificateResult = {
  data: {
    createdUser: number | null;
    createdTime: string;
    updatedUser: number | null;
    updatedTime: string;
    id: number;
    cerTemplateId: number | null;
    name: string;
  };
  message: string;
};
export type UpdateDataQuestion = {
  id?: string | number;
  question: string;
  type: string;
  questionIndex: number;
  addAnswers: {
    answer: string;
    correct: boolean;
    id?: string | number;
  }[];
  fileKeysDelete: string[];
  answersIdDelete: string[];
};
