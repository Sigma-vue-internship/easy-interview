import { defineStore } from "pinia";
export const useQuestionStore = defineStore("question", {
  state: () => {
    return {
      questions: [],
    };
  },
  actions: {
    async getAllQuestions(category) {
      return this.$axios.get("/questions", {
        params: {
          category,
        },
      });
    },
    async editQuestion(questionData, questionId) {
      const {
        data: { answer, category, id, point, text },
      } = await this.$axios.put(`/questions/${questionId}`, {
        ...questionData,
      });
      const questionIndex = this.questions.find(
        (question) => question.id === id
      );
      this.questions[questionIndex] = { answer, category, id, point, text };
    },
  },
});
