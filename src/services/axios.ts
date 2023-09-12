import { API_BASE_URL, AUTH_TOKEN_KEY } from "@listed-constants";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
  let token = await getItemAsync(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
