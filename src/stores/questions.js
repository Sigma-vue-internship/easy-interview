import { defineStore } from "pinia";
import axios from "axios";
export const useQuestionStore = defineStore("question", {
  actions: {
    async getAllQuestions(category) {
      return axios.get(`${import.meta.env.VITE_MOCK_API_URL}/questions`, {
        params: {
          category,
        },
      });
    },
  },
});
