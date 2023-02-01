import axiosInst from "axios";
import { getAuthHeader } from "../hooks/getAuthHeader";
// const axiosConfig = {
//   baseURL: `${import.meta.env.VITE_MOCK_API_URL}`,
// };
// export default (function createAxiosInstance() {
//   const axiosInstance = axios.create(axiosConfig);
//   return axiosInstance;
// })();

const axios = axiosInst.create({
  baseURL: `${(import.meta as any).env.VITE_DEV_API_URL}`,
});
axios.interceptors.request.use(
  config => {
    const authHeader = getAuthHeader();
    console.log(config);

    if (config.url === "/users/auth") {
      config.headers.Authorization = authHeader.Authorization;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
