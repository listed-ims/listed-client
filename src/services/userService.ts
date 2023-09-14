import { authAxiosInstance, axiosInstance } from "./axios";
import {
  UserResponse,
  AuthenticationResponse,
  LoginCredentials,
  RegistrationCredentials,
  UserRequest
} from "@listed-types";

export const loginService = async (loginCredentials: LoginCredentials) => {
  try {
    const response = await authAxiosInstance.post("login", loginCredentials);
    return response.data as AuthenticationResponse;
  } catch (error) {
    throw error;
  }
};

export const registrationService = async (registrationCredentials: RegistrationCredentials) => {
  try {
    const response = await authAxiosInstance.post("register", registrationCredentials);
    return response.data as AuthenticationResponse;
  } catch (error) {
    throw error;
  }
};

export const getUserService = async () => {
  try {
    const response = await axiosInstance.get("users");
    return response.data as UserResponse;
  } catch (error) {
    throw error;
  }
};

export const validateTokenService = async () => {
  try {
    const response = await axiosInstance.post("users/validation/token");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateUsernameService = async () => {
  try {
    const response = await axiosInstance.post("users/validation/username");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateUserService = async (userRequest: UserRequest) => {
  try {
    const response = await axiosInstance.put("users", userRequest);
    return response.data as UserResponse;
  } catch (error) {
    throw error;
  }
}

// THESE ARE THE PREVIOUS SERVICES IMPLEMENTATIONS. WE'LL START TO TRANSITION TO THE NEW ONES LIKE ABOVE.

// const loginService = (loginCredentials: LoginCredentials) => {
//   return axios.post(`${API_BASE_URL}login`, loginCredentials);
// };

// const registerService = (userDetails: User) => {
//   return axios.post(`${API_BASE_URL}register`, userDetails);
// };

// const validateUsernameService = (username: string) => {
//   return axios.post(`${API_BASE_URL}username-validation?username=${username}`);
// };

// const getUserService = (token: string) => {
//   return axios.get(`${API_BASE_URL}`, {
//     headers: {
//       Authorization: token,
//     },
//   });
// };

// export {
//   loginService,
//   registerService,
//   validateUsernameService,
//   getUserService,
// };
