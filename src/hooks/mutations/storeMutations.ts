import { createStoreService } from "@listed-services";
import { StoreRequest, StoreResponse } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateStoreMutation = (
  mutationOptions: MutationOptions<StoreResponse, AxiosError, StoreRequest>
) => {
  return useMutation(createStoreService, mutationOptions);
};
