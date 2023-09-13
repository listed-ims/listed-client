import { createStoreService } from "@listed-services";
import { StoreRequest } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateStoreMutation = (
  mutationOptions: MutationOptions<any, AxiosError, StoreRequest>
) => {
  return useMutation(createStoreService, mutationOptions);
};
