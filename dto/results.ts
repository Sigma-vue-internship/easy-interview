export interface QuestionAnswer {
  text: string;
  point: number;
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
