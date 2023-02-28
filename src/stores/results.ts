import { defineStore } from "pinia";
import { Result } from "../dto/results";
import axios from "../service/axiosInstance";

export const useResultsStore = defineStore("results", {
  actions: {
    async postResult(result: Result) {
      const response = await axios.post("/results/create", result);
      return response.data;
    },
    async getResultsForCandidate(candidateId: string) {
      const response = await axios.get(`/results/filter/${candidateId}`);
      return response.data.result;
    },
    async getOneResult(resultId: string) {
      const response = await axios.get(`/results/get/${resultId}`);
      return response.data.result[0];
    },
    async getLastResult() {
      const response = await axios.get("/results/findlast");
      return response.data.result;
    },
    async getAllResults() {
      const response = await axios.get("/results/get");
      return response.data.results;
    },
    async deleteResult(resultId: string) {
      await axios.delete(`/results/delete/${resultId}`);
    },
  },
});
