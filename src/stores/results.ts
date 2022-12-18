import { defineStore } from "pinia";
import { Result, PercentsResult } from "../../dto/results";
export const useResultsStore = defineStore("results", {
  actions: {
    async postResult(result: Result, candidateId: string): Promise<Result> {
      return this.$axios.post(`/candidates/${candidateId}/results`, result);
    },
    async postPercentageResult(
      result: PercentsResult,
    ): Promise<PercentsResult> {
      return this.$axios.post("/candidateResults", result);
    },
    async getPercentageResults(): Promise<PercentsResult[]> {
      return this.$axios.get("/candidateResults").then(({ data }) => data);
    },
    async getResultsForCandidate(candidateId: string): Promise<Result[]> {
      return this.$axios
        .get(`/candidates/${candidateId}/results`)
        .then(({ data }) => data);
    },
    async getOneResultForCandidate(
      candidateId: string,
      resultId: string,
    ): Promise<Result> {
      return this.$axios
        .get(`/candidates/${candidateId}/results/${resultId}`)
        .then(({ data }) => data);
    },
  },
});
