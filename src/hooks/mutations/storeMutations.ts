import { createStoreService, closeStoreService } from "@listed-services";
import { StoreRequest, CloseStoreRequest } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateStoreMutation = (
  mutationOptions: MutationOptions<any, AxiosError, StoreRequest>
) => {
  return useMutation(createStoreService, mutationOptions);
};

export const useCloseStoreMutation = (
  mutationOptions: MutationOptions<any, AxiosError, CloseStoreRequest>
) => {
  return useMutation(closeStoreService, mutationOptions);
};
