import { defineStore } from "pinia";
export const useQuestionStore = defineStore("question", {
  state: () => {
    return {
      questions: [],
      currentEditQuestion: {},
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
    // setCurrentEditQuestion(question) {
    //   this.currentEditQuestion = { ...question };
    // },
    async sendQuestion(questionData) {
      const {
        data: { answer, category, id, point, text },
      } = await this.$axios.put(`/questions/${questionData.id}`, {
        ...questionData,
      });
      const questionIndex = this.questions.find(
        (question) => question.id === id
      );
      this.questions[questionIndex] = { answer, category, id, point, text };
      // this.currentEditQuestion = {};
    },
  },
});
