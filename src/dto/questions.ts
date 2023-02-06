export interface Question {
  text: string;
  point: number;
  category: string;
  answer: string;
  _id?: string;
}

export interface questionResponse {
  questions: Question[];
}
