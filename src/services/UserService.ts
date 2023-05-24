import axios from "axios";
import { BASE_URL } from "../utils/Api";
import { LoginCredentials } from "../types/Logins";
import { User } from "../types/User";

class UserService {
  login(loginCredentials: LoginCredentials) {
    return axios.post(`${BASE_URL}login`, loginCredentials);
  }

  register(userDetails: User) {
    return axios.post(`${BASE_URL}register`, userDetails);
  }

  validateUsername(username: string) {
    return axios.post(`${BASE_URL}username-validation?username=${username}`);
  }
}

export default new UserService();
