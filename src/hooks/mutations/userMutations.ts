import { loginService, registrationService, updateUserService, validateTokenService, validateUsernameService } from "@listed-services";
import { LoginCredentials, RegistrationCredentials, UserRequest } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUserLoginMutation = (
  mutationOptions: MutationOptions<any, AxiosError, LoginCredentials>
) => {
  return useMutation(loginService, mutationOptions);
};

export const useTokenValidationMutation = (
  mutationOptions: MutationOptions<any, AxiosError>
) => {
  return useMutation(validateTokenService, mutationOptions);
};

export const useUserRegistrationMutation = (
  mutationOptions: MutationOptions<any, AxiosError, RegistrationCredentials>
) => {
  return useMutation(registrationService, mutationOptions);
};

export const useUsernameValidationMutation = (
  mutationOptions: MutationOptions<any, AxiosError>
) => {
  return useMutation(validateUsernameService, mutationOptions);
};

export const useUpdateUserMutation = (
  mutationOptions: MutationOptions<any, AxiosError, UserRequest>
) => {
  return useMutation(updateUserService, mutationOptions);
};