import { IResultAnswerResponse, ISingleCandidateResult } from "./../dto/results";
import { defineStore } from "pinia";
import { Result, PercentsResult, IResultDescription } from "../dto/results";
import axios from "../service/axiosInstance";

export const useResultsStore = defineStore("results", {
  actions: {
    async postResult(result: Result, candidateId: string) {
      const { questionAnswer, title, startedAt, endedAt } = result;
      const response = await axios.post<Result>("/results/create", {
        candidates_id: candidateId,
        title,
        started_at: startedAt,
        ended_at: endedAt,
        questions_results: questionAnswer,
      });
      return response.data;
    },
    // async postPercentageResult(result: PercentsResult) {
    //   await axios.post("/candidateResults", result);
    // },
    async getPercentageResults() {
      const response = await axios.get<PercentsResult[]>("/candidateResults");
      return response.data;
    },
    async getResultsForCandidate(candidateId: number) {
      const response = await axios.get<ISingleCandidateResult[]>(
        `/results/all/${candidateId}`,
      );
      return response.data;
    },
    async getOneResultForCandidate(candidateId: string, resultId: string) {
      const response = await axios.get<IResultDescription>(
        `/results/get/candidate/${candidateId}/result/${resultId}`,
      );
      return response.data;
    },
    async getResultAnswersByResultId(resultId: number) {
      const response = await axios.get<IResultAnswerResponse>(
        `/results/get/${resultId}`,
      );
      return response.data;
    },
    async deleteResult(candidates_id: number, result_id: number) {
      await axios.delete("/results/delete", {
        data: {
          candidates_id,
          result_id,
        },
      });
    },
    async deletePercentageResult(resultId: string) {
      await axios.delete(`/candidateResults/${resultId}`);
    },
  },
});
