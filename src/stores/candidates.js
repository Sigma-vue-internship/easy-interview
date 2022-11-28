import { defineStore } from "pinia";
export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getCandidateById(id) {
      return this.$axios.get(`/candidates/${id}`);
    },
    async getCandidatesByPage(page) {
      return this.$axios.get(`/candidates?p=${page}&l=8`);
    },
  },
});
