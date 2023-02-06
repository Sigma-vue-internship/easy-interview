import axiosInst from "axios";

// const axiosConfig = {
//   baseURL: `${import.meta.env.VITE_MOCK_API_URL}`,
// };
// export default (function createAxiosInstance() {
//   const axiosInstance = axios.create(axiosConfig);
//   return axiosInstance;
// })();

const axios = axiosInst.create({
  baseURL: `${(import.meta as any).env.VITE_BACK_API_URL}`,
});

export default axios;
