import { loginService } from "@listed-services";
import { LoginCredentials } from "@listed-types";
import { AxiosError } from "axios";
import { MutationOptions, useMutation } from "react-query";

export const useUserLoginMutation = (
  mutationOptions: MutationOptions<any, AxiosError, LoginCredentials>
) => {
  return useMutation(loginService, mutationOptions);
};
