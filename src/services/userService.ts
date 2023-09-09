import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { LoginCredentials } from "../types/logins";
import { User } from "../types/user";
import { authAxiosInstance } from "./axios";

export const loginService = async (loginCredentials: LoginCredentials) => {
  try {
    const response = await authAxiosInstance.post("login", loginCredentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// THESE ARE THE PREVIOUS SERVICES IMPLEMENTATIONS. WE'LL START TO TRANSITION TO THE NEW ONES LIKE ABOVE.

// const loginService = (loginCredentials: LoginCredentials) => {
//   return axios.post(`${API_BASE_URL}login`, loginCredentials);
// };

const registerService = (userDetails: User) => {
  return axios.post(`${API_BASE_URL}register`, userDetails);
};

const validateUsernameService = (username: string) => {
  return axios.post(`${API_BASE_URL}username-validation?username=${username}`);
};

const getUserService = (token: string) => {
  return axios.get(`${API_BASE_URL}`, {
    headers: {
      Authorization: token,
    },
  });
};

// export {
//   loginService,
//   registerService,
//   validateUsernameService,
//   getUserService,
// };
