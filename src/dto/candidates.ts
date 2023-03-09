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

export interface CandidatesResponse {
  candidates: Candidate[];
}
