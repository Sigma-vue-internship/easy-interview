import { defineStore } from "pinia";
import axios from "../service/axiosInstance";
import { IUser } from "../dto/user";

export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      isAuthenticated: false,
    };
  },
  actions: {
    async singupUser(user: IUser) {
      const data = await axios.post("/users/register", user);
      return data;
    },
    async loginUser(user: IUser) {
      const data = await axios.post("/users/login", user);
      return data;
    },
    async validationUser() {
      const data = await axios.get("/users/validate");
      return data;
    }
  },
});
