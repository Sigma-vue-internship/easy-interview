import { defineStore } from "pinia";
export const useResultsStore = defineStore("results", {
  actions: {
    async getResultsForCandidate(candidateId) {
      return this.$axios.get(`/candidates/${candidateId}/results`);
    },
    async getOneResultForCandidate(candidateId, resultId) {
      return this.$axios.get(`/candidates/${candidateId}/results/${resultId}`);
    },
  },
});
