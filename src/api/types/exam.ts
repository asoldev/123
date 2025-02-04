export interface QuestionAndAnswer {
  questionId: number;
  answersId: number[];
}

export interface SubmitExamParams {
  userExamId: number;
  spentTime: string;
  questionsAndAnswers: QuestionAndAnswer[];
}

export interface DoExamParams {
  examId: number;
  name: string;
  phone: string;
  cccd: string;
  cityId: number;
}