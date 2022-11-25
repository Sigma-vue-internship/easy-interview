export interface QuizQuestion {
  text: string;
  point: number;
  answerPoints: number;
  answer: string;
  category: string;
  id: string;
}

export interface QuizList {
  quizList: QuizQuestion[];
}
