import { defineStore } from "pinia";
import { Question } from "../dto/questions";
import axios from "../service/axiosInstance";

export const useQuestionStore = defineStore("question", {
  actions: {
    async getAllQuestions(category?: string) {
      const response = await axios.get<Question[]>("/questions", {
        params: {
          category,
        },
      });
      return response.data;
    },
    async sendQuestion(questionData: Question) {
      const response = await axios.put<Question>(
        `/questions/${questionData.id}`,
        questionData,
      );
      return response.data;
    },
    async postQuestion(question: Question) {
      await axios.post<void>("/questions", question);
    },
    async deleteQuestion(id: string) {
      await axios.delete<void>(`/questions/${id}`);
    },
  },
});
