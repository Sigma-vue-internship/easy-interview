export interface QuizQuestion {
  id: string;
  question: string;
  answer: string;
  max_point: number;
  answerPoints?: number;
  question_categories_id: number;
}

export interface QuizResult {
  questionAnswer: QuizQuestion[];
  title: string;
  startedAt: number;
  endedAt: number;
}

export interface CategoryQuestions {
  [key: string]: QuizQuestion[];
}
// question -->
