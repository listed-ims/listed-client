import axios from "axios";
import { BASE_URL } from "../utils/constants/Api";
import { LoginCredentials } from "../types/Logins";
import { User } from "../types/User";

const loginService = (loginCredentials: LoginCredentials) => {
  return axios.post(`${BASE_URL}login`, loginCredentials);
};

const registerService = (userDetails: User) => {
  return axios.post(`${BASE_URL}register`, userDetails);
};

const validateUsernameService = (username: string) => {
  return axios.post(`${BASE_URL}username-validation?username=${username}`);
};

const getUserService = (token: string) => {
  return axios.get(`${BASE_URL}`, {
    headers: {
      Authorization: token,
    },
  });
};

export { loginService, registerService, validateUsernameService, getUserService };
