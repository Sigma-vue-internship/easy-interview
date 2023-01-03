import { defineStore } from "pinia";
import { Candidate, CandidatesResponse } from "../dto/candidates";
import axios from "../service/axiosInstance";
interface CandidatesByPage {
  candidates: Candidate[];
  count: number;
}
export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getCandidateById(id: string) {
      const response = await axios.get<Candidate>(`/candidates/${id}`);
      return response.data;
    },
    async addCandidate(candidate: Candidate) {
      await axios.post("/candidates", candidate);
    },
    async editCandidate(candidate: Candidate) {
      const response = await axios.put<Candidate>(
        `/candidates/${candidate.id}`,
        candidate,
      );
      return response.data;
    },
    async deleteCandidateById(id: string) {
      await axios.delete(`/candidates/${id}`);
    },
    async getCandidatesByPage(page: number) {
      const response = await axios.get<CandidatesByPage>(
        `/candidates?p=${page}&l=8`,
      );
      return response.data;
    },
    async getAllCandidates() {
      const response = await axios.get<CandidatesResponse>("/candidates");
      return response.data.candidates;
    },
    async getCandidatesByUsername(username: string) {
      const response = await axios.get<CandidatesResponse>(
        `/candidates?username=${username}`,
      );
      return response.data.candidates;
    },
  },
});
