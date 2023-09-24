import {
  loginService,
  registrationService,
  updateUserService,
  validateTokenService,
  validateUsernameService,
} from "@listed-services";
import {
  AuthenticationResponse,
  LoginCredentials,
  RegistrationCredentials,
  UserRequest,
  UserResponse,
} from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUserLoginMutation = (
  mutationOptions: MutationOptions<
    AuthenticationResponse,
    AxiosError,
    LoginCredentials
  >
) => {
  return useMutation(loginService, mutationOptions);
};

export const useTokenValidationMutation = (
  mutationOptions: MutationOptions<any, AxiosError>
) => {
  return useMutation(validateTokenService, mutationOptions);
};

export const useUserRegistrationMutation = (
  mutationOptions: MutationOptions<
    AuthenticationResponse,
    AxiosError,
    RegistrationCredentials
  >
) => {
  return useMutation(registrationService, mutationOptions);
};

export const useUsernameValidationMutation = (
  mutationOptions: MutationOptions<any, AxiosError>
) => {
  return useMutation(validateUsernameService, mutationOptions);
};

export const useUpdateUserMutation = (
  mutationOptions: MutationOptions<UserResponse, AxiosError, UserRequest>
) => {
  return useMutation(updateUserService, mutationOptions);
};
