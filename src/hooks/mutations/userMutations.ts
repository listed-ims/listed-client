import { loginService, validateTokenService } from "@listed-services";
import { LoginCredentials } from "@listed-types";
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
