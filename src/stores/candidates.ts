import { defineStore } from "pinia";
import { Candidate } from "../dto/candidates";
import axios from "../service/axiosInstance";

export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getCandidateById(id: string) {
      const response = await axios.get<Candidate>(`/candidates/${id}`);
      return response.data;
    },
    async addCandidate(candidate: Candidate) {
      await axios.post<void>("/candidates", candidate);
    },
    async editCandidate(candidate: Candidate) {
      const response = await axios.put<Candidate>(
        `/candidates/${candidate.id}`,
        candidate,
      );
      return response.data;
    },
    async deleteCandidateById(id: string) {
      await axios.delete<void>(`/candidates/${id}`);
    },
    async getCandidatesByPage(page: number) {
      const response = await axios.get<Candidate[]>(
        `/candidates?p=${page}&l=8`,
      );
      return response.data;
    },
    async getAllCandidates() {
      const response = await axios.get<Candidate[]>("/candidates");
      return response.data["candidates"];
    },
    async getCandidatesByUsername(username: string) {
      const response = await axios.get<Candidate[]>(
        `/candidates?username=${username}`,
      );
      return response.data["candidates"];
    },
  },
});
