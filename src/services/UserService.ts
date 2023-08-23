import axios from "axios";
import { API_BASE_URL } from "../constants/Api";
import { LoginCredentials } from "../types/Logins";
import { User } from "../types/User";

const loginService = (loginCredentials: LoginCredentials) => {
  return axios.post(`${API_BASE_URL}login`, loginCredentials);
};

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

export {
  loginService,
  registerService,
  validateUsernameService,
  getUserService,
};
