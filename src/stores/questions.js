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
    async postQuestion(question) {
      return this.$axios.post("/questions", question);
    },
    async deleteQuestion(id) {
      return this.$axios.delete(`/questions/${id}`);
    },
  },
});
