import { defineStore } from "pinia";
import { Question } from "../../dto/questions";

export const useQuestionStore = defineStore("question", {
  actions: {
    async getAllQuestions(category?: string): Promise<Question[]> {
      return this.$axios
        .get("/questions", {
          params: {
            category,
          },
        })
        .then(({ data }) => data);
    },
    async sendQuestion(questionData: Question): Promise<Question> {
      return this.$axios.put(`/questions/${questionData.id}`, questionData);
    },
    async postQuestion(question: Question): Promise<Question> {
      return this.$axios.post("/questions", question);
    },
    async deleteQuestion(id: string): Promise<Question> {
      return this.$axios.delete(`/questions/${id}`);
    },
  },
});
