import { defineStore } from "pinia";
export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getCandidateById(id) {
      return this.$axios.get(`/candidates/${id}`);
    },
    async editCandidate(candidate) {
      return this.$axios.put(`/candidates/${candidate.id}`, candidate);
    },
    async deleteCandidateById(id) {
      return this.$axios.delete(`/candidates/${id}`);
    },
    async getCandidatesByPage(page) {
      return this.$axios.get(`/candidates?p=${page}&l=8`);
    },
    async getAllCandidates() {
      return this.$axios.get("/candidates");
    },
  },
});
