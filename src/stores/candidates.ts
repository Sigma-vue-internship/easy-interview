import { defineStore } from "pinia";
import { Candidate, CandidatesResponse } from "../dto/candidates";
import axios from "../service/axiosInstance";
interface CandidatesByPage {
  candidates: Candidate[];
  count: number;
}
export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getAllCandidates() {
      const response = await axios.get("/candidates/get");
      return response.data.candidates;
    },
    async addCandidate(candidate: Candidate) {
      await axios.post("/candidates/create", candidate);
    },
    async getCandidateById(id: string) {
      const response = await axios.get(`/candidates/get/${id}`);
      return response.data.candidate;
    },
    async deleteCandidateById(id: string) {
      await axios.delete(`/candidates/delete/${id}`);
    },
    async editCandidate(candidate: Candidate) {
      const data = {
        username: candidate.username,
        position: candidate.position,
        linkedinUrl: candidate.linkedinUrl,
        avatarUrl: candidate.avatarUrl,
        feedback: candidate.feedback,
      };
      const response = await axios.patch(
        `candidates/update/${candidate._id}`,
        data,
      );
      return response.data.candidate;
    },

    async getCandidatesByUsername(username: string) {
      const response = await axios.get<CandidatesResponse>(
        `candidates/find/${username}`,
      );

      return response.data.candidates;
    },
    async getCandidatesByPage(page: number) {
      const response = await axios.get(`/candidates/show/${page}`);
      return response.data;
    },
  },
});
