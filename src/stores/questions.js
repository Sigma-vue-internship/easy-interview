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
    async sendQuestion(questionData) {
      return this.$axios.put(`/questions/${questionData.id}`, questionData);
    },
  },
});
