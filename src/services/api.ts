import axios, { InternalAxiosRequestConfig } from "axios";
import { TOKEN_REFERENCE } from "../providers/AuthProvider";

export const apiBase = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiBase.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_REFERENCE);

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
