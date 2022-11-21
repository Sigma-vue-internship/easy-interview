export interface QuestionAnswer {
  question: string;
  questionScore: number;
  answerPoints: number;
  category: string;
  answer: string;
}

export interface ResultParent {
  position: string;
  username: string;
  linkedinUrl: string;
  feedback: string;
  avatarUrl: string;
  id: number;
}

export interface Result {
  questionAnswer: QuestionAnswer[];
  startedAt: number;
  endedAt: number;
  id: number;
  parent: ResultParent;
}