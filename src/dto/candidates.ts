export interface Candidate {
  position: string;
  username: string;
  linkedinUrl: string;
  feedback: string;
  avatarUrl: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export interface CandidatesResponse {
  candidates: Candidate[];
}
