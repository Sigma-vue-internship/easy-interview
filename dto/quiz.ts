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
  title: string;
  startedAt: number;
  endedAt: number;
}
