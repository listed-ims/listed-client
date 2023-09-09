import { API_BASE_URL } from "@listed-constants";
import axios from "axios";
import { getToken } from "./tokenStorage";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
