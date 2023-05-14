import { AppError } from "@/domain/utils/app_error";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.8:3333",
  timeout: 6000,
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
