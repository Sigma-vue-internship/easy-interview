import { defineStore } from "pinia";
import { Result, PercentsResult } from "../dto/results";
import { ILoginResponse, IUser } from "../dto/user";
import axios from "../service/axiosInstance";

export const useUserStore = defineStore("users", {
  actions: {
    async signupUser(user: IUser) {
      const res = await axios.post<IUser>("/users/signup", user);

      return res;
    },
    async loginUser(user: IUser) {
      const res = await axios.post<ILoginResponse>("/users/login", user);

      return res;
    },
  },
});
