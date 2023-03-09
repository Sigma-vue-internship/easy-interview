import { ICategory } from "./../dto/ICategory";
import { defineStore } from "pinia";
import { Question } from "../dto/questions";
import axios from "../service/axiosInstance";

export const useQuestionStore = defineStore("question", {
  actions: {
    async getAllQuestions(question_categories_id?: string) {
      const response = await axios.get<Question[]>("/questions/all", {
        params: {
          question_categories_id,
        },
      });
      return response.data;
    },
    async sendQuestion(questionData: Question) {
      const { id, question_categories_id, max_point, question, answer } =
        questionData;
      const response = await axios.put<Question>("/questions/edit", {
        question_id: id,
        category_id: question_categories_id,
        maxPoint: max_point,
        question,
        answer,
      });
      return response.data;
    },
    async postQuestion(questionData: Question) {
      const { question_categories_id, max_point, question, answer } =
        questionData;
      await axios.post("/questions/create", {
        category_id: question_categories_id,
        maxPoint: max_point,
        question,
        answer,
      });
    },
    async getAllQuestionCategories() {
      const { data } = await axios.get<ICategory[]>("/categories/all");
      console.log(data);

      return data;
    },
    async deleteQuestion(id: number) {
      await axios.delete("/questions/delete", {
        data: {
          question_id: id,
        },
      });
    },
  },
});
