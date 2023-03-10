export interface Candidate {
  avatar_url: string;
  createdAt: string;
  feedback: string;
  id: number;
  linkedin_url: string;
  position: string;
  updatedAt: string;
  username: string;
  users_id: number;
}

export interface ICandidate {
  id: number;
  position: string;
  username: string;
  linkedin_url: string;
  feedback: string;
  avatar_url: string;
  users_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface CandidatesResponse {
  candidates: Candidate[];
}
