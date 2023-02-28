export interface QuestionAnswer {
  text: string;
  point: number;
  answerPoints: number;
  category: string;
  answer: string;
  _id: string;
}

export interface ResultParent {
  position: string;
  username: string;
  linkedinUrl: string;
  feedback: string;
  avatarUrl: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Result {
  answerArray: QuestionAnswer[];
  startedAt: number;
  endedAt: number;
  title: string;
  _id?: string;
  resultPoints: string;
  candidateId: ResultParent;
  createdAt: string;
  updatedAt: string;
}
