import { authAxiosInstance, axiosInstance } from "./axios";
import {
  UserResponse,
  AuthenticationResponse,
  LoginCredentials,
  RegistrationCredentials,
  UserRequest,
} from "@listed-types";

export const loginService = async (loginCredentials: LoginCredentials) => {
  try {
    const response = await authAxiosInstance.post("login", loginCredentials);
    return response.data as AuthenticationResponse;
  } catch (error) {
    throw error;
  }
};

export const registrationService = async (
  registrationCredentials: RegistrationCredentials
) => {
  try {
    const response = await authAxiosInstance.post(
      "register",
      registrationCredentials
    );
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
};

export const updateUserService = async (userRequest: UserRequest) => {
  try {
    const response = await axiosInstance.put("users", userRequest);
    return response.data as UserResponse;
  } catch (error) {
    throw error;
  }
};
