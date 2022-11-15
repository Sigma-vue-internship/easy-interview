import axios from "axios";

const axiosConfig = {
  baseURL: `${import.meta.env.VITE_MOCK_API_URL}`,
};
export default (function createAxiosInstance() {
  const axiosInstance = axios.create(axiosConfig);
  return axiosInstance;
})();
