import { defineStore } from "pinia";
import { Result, PercentsResult } from "../dto/results";
import axios from "../service/axiosInstance";

export const useResultsStore = defineStore("results", {
  actions: {
    async postResult(result: Result, candidateId: string) {
      const response = await axios.post<Result>(
        `/candidates/${candidateId}/results`,
        result,
      );
      return response.data;
    },
    async postPercentageResult(result: PercentsResult) {
      await axios.post("/candidateResults", result);
    },
    async getPercentageResults() {
      const response = await axios.get<PercentsResult[]>("/candidateResults");
      return response.data;
    },
    async getResultsForCandidate(candidateId: string) {
      const response = await axios.get<Result[]>(`/results/all/${candidateId}`);
      return response.data;
    },
    async getOneResultForCandidate(candidateId: string, resultId: string) {
      const response = await axios.get<Result>(
        `/candidates/${candidateId}/results/${resultId}`,
      );
      return response.data;
    },
    async deleteResult(candidateId: string, resultId: string) {
      await axios.delete(`/candidates/${candidateId}/results/${resultId}`);
    },
    async deletePercentageResult(resultId: string) {
      await axios.delete(`/candidateResults/${resultId}`);
    },
  },
});
