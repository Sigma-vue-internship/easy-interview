import { defineStore } from "pinia";
import { Candidate } from "../../dto/candidates";

export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getCandidateById(id: string): Promise<Candidate> {
      return this.$axios.get(`/candidates/${id}`).then(({ data }) => data);
    },
    async addCandidate(candidate: Candidate): Promise<Candidate> {
      return this.$axios.post("/candidates", candidate);
    },
    async editCandidate(candidate: Candidate): Promise<Candidate> {
      return this.$axios
        .put(`/candidates/${candidate.id}`, candidate)
        .then(({ data }) => data);
    },
    async deleteCandidateById(id: string): Promise<Candidate> {
      return this.$axios.delete(`/candidates/${id}`);
    },
    async getCandidatesByPage(page: number): Promise<Candidate[]> {
      return this.$axios
        .get(`/candidates?p=${page}&l=8`)
        .then(({ data }) => data);
    },
    async getAllCandidates(): Promise<Candidate[]> {
      return this.$axios
        .get("/candidates")
        .then(({ data: { candidates } }) => candidates);
    },
    async getCandidatesByUsername(username: string): Promise<Candidate[]> {
      return this.$axios
        .get(`/candidates?username=${username}`)
        .then(({ data: { candidates } }) => candidates);
    },
  },
});
