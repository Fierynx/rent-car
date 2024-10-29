import axios, { AxiosError } from "axios";
import { API_URL } from "../lib/config";
import cookies from "js-cookie";

export const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

API.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

//ngilangin err dri stacknya axios
API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let cleanError = {} as AxiosError;
    if (error && error.stack) {
      cleanError = { ...error, stack: "" };
    }
    return Promise.reject(cleanError);
  }
);