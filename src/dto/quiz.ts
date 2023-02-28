export interface QuizQuestion {
  text: string;
  point: number;
  answerPoints?: number;
  answer: string;
  category: string;
  _id?: string;
}

export interface QuizResult {
  answerArray: QuizQuestion[];
  title: string;
  startedAt: number;
  endedAt: number;
  resultsPoints: number;
}

export interface CategoryQuestions {
  [key: string]: QuizQuestion[];
}
// question -->
