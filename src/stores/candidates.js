import { defineStore } from "pinia";
export const useCandidateStore = defineStore("candidates", {
  actions: {
    async getCandidateById(id) {
      return this.$axios.get(`/candidates/${id}`);
    },
    async getAllCandidates() {
      return this.$axios.get("/candidates");
    },
  },
});
