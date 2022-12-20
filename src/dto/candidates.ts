export interface Candidate {
  position: string;
  username: string;
  linkedinUrl: string;
  feedback: string;
  avatarUrl: string;
  id: string;
}

export interface CandidatesResponse {
  candidates: Candidate[];
}
