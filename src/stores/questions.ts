import { defineStore } from "pinia";
import { Question, questionResponse } from "../dto/questions";
import axios from "../service/axiosInstance";

export const useQuestionStore = defineStore("question", {
  actions: {
    async getAllQuestions() {
      const response = await axios.get<questionResponse>("/questions/get");
      return response.data.questions;
    },

    async getQuestionsByFilter(category: string) {
      const response = await axios.get<questionResponse>(
        `/questions/filter/${category}`,
      );
      return response.data.questions;
    },

    async postQuestion(question: Question) {
      await axios.post("/questions/create", question);
    },

    async sendQuestion(questionData: Question) {
      const data = {
        text: questionData.text,
        answer: questionData.answer,
        category: questionData.category,
        point: questionData.point,
      };

      const response = await axios.patch<Question>(
        `/questions/update/${questionData._id}`,
        data,
      );
      return response.data;
    },

    async deleteQuestion(id: string) {
      await axios.delete(`/questions/delete/${id}`);
    },
  },
});
