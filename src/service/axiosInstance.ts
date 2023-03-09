import axiosInst from "axios";
import { getAuthHeader } from "../hooks/getAuthHeader";

const guardedRoutes: Array<string> = [
  "/questions",
  "/users/auth",
  "/categories",
  "/candidates",
  "/results",
];

const axios = axiosInst.create({
  baseURL: `${(import.meta as any).env.VITE_DEV_API_URL}`,
});
axios.interceptors.request.use(
  config => {
    const authHeader = getAuthHeader();
    const isRouteGuarded = guardedRoutes.some(route =>
      config.url?.startsWith(route),
    );

    if (isRouteGuarded && config.headers) {
      config.headers.Authorization = authHeader.Authorization;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
