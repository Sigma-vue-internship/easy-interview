import { defineStore } from "pinia";
export const useQuestionStore = defineStore("question", {
  actions: {
    async getAllQuestions(category) {
      return this.$axios.get("/questions", {
        params: {
          category,
        },
      });
    },
  },
});
