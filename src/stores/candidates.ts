import { defineStore } from "pinia";
import { Candidate, CandidatesResponse } from "../dto/candidates";
import axios from "../service/axiosInstance";
interface CandidatesByPage {
  candidates: Candidate[];
  count: number;
}
export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getCandidateById(id: number) {
      const response = await axios.get<Candidate>(`/candidates/get/${id}`);
      debugger;

      return response.data;
    },

    async addCandidate(candidate: Candidate) {
      const { id, createdAt, updatedAt, users_id, ...rest } = candidate;

      await axios.post("/candidates/create", { ...rest });
    },

    async editCandidate(candidate: Candidate) {
      const { id, users_id, updatedAt, createdAt, ...rest } = candidate;

      const response = await axios.put<Candidate>("/candidates/edit", {
        candidate_id: id,
        ...rest,
      });

      return response.data[1][0];
    },

    async deleteCandidateById(id: number) {
      await axios.delete("/candidates/delete", {
        data: {
          candidate_id: id,
        },
      });
    },
    async getCandidatesByPage(page: number) {
      const response = await axios.get<CandidatesByPage>(
        `/candidates/page?p=${page}&l=8`,
      );
      return response.data;
    },
    async getAllCandidates() {
      const response = await axios.get<CandidatesResponse>("/candidates");
      return response.data.candidates;
    },
    async getCandidatesByUsername(username: string) {
      const response = await axios.get<Candidate[]>(
        `/candidates/getByUsername/${username}`,
      );
      return response.data;
    },
  },
});
