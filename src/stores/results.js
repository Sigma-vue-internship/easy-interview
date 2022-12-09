import { defineStore } from "pinia";
export const useResultsStore = defineStore("results", {
  actions: {
    async postResult(result, candidateId) {
      return this.$axios.post(`/candidates/${candidateId}/results`, result);
    },
    async postPercentageResult(result) {
      return this.$axios.post("/candidateResults", result);
    },
    async getPercentageResults() {
      return this.$axios.get("/candidateResults");
    },
  },
});
