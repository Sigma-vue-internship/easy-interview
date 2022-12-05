import { defineStore } from "pinia";
export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getCandidateById(id) {
      return this.$axios.get(`/candidates/${id}`);
    },
    async addCandidate(candidate) {
      return this.$axios.post("/candidates", candidate);
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
  },
});
