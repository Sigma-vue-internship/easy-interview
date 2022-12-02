export interface QuizQuestion {
  text: string;
  point: number;
  answerPoints: number;
  answer: string;
  category: string;
  id: string;
}

export interface QuizResult {
  questionAnswer: QuizQuestion[];
  id: number;
  startedAt: number;
  endedAt: number;
}
