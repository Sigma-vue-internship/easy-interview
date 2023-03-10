export interface QuestionAnswer {
  questions_id: number;
  question_point: number;
}
// export interface QuestionAnswer {
//   questionId: number;
//   text: string;
//   point: number;
//   answerPoints: number;
//   category: string;
//   answer: string;
// }

export interface ResultParent {
  position: string;
  username: string;
  linkedin_url: string;
  feedback: string;
  avatar_url: string;
  id: string;
}

export interface Result {
  questionAnswer: QuestionAnswer[];
  startedAt: number;
  endedAt: number;
  title: string;
  id: string;
  parent: ResultParent;
}

export interface PercentsResult {
  candidateUsername: string;
  candidateId: string;
  resultPoints: number;
  id: string;
}
export interface IResultDescription {
  id: number;
  title: string;
  started_at: string;
  ended_at: string;
  candidates_id: number;
  createdAt: string;
  updatedAt: string;
}
export type IResultAnswerResponse = Array<IResultAnswer>;
export interface IResultAnswer {
  createdAt: string;
  question: IResultAnswerQuestion;
  question_point: number;
  questions_id: number;
  results_id: number;
  updatedAt: string;
}
export interface IResultAnswerQuestion {
  answer: string;
  createdAt: string;
  id: number;
  max_point: number;
  question: string;
  question_categories_id: number;
  updatedAt: string;
  users_id: number;
}

export interface ISingleCandidateResult {
  candidates_id: number;
  createdAt: string;
  ended_at: string;
  id: number;
  started_at: string;
  title: string;
  updatedAt: string;
}
