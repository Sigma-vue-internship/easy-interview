import { defineStore } from "pinia";
import axios from "axios";
export const useQuestionStore = defineStore("question", {
  actions: {
    async getAllQuestions(category) {
      return axios.get(
        "https://63510b67dfe45bbd55b4fc4d.mockapi.io/questions",
        {
          params: {
            category,
          },
        }
      );
    },
  },
});
