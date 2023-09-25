import { createIncomingService } from "@listed-services";
import { IncomingRequest, IncomingResponse } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateIncomingMutation = (
  mutationOptions: MutationOptions<
    IncomingResponse,
    AxiosError,
    [IncomingRequest, number]
  >
) => {
  return useMutation(
    ([incomingRequest, productId]) =>
      createIncomingService(incomingRequest, productId),
    mutationOptions
  );
};
