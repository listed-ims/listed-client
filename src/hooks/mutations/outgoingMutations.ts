import { createOutgoingService } from "@listed-services";
import { OutgoingRequest, OutgoingResponse } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateOutgoingMutation = (
  mutationOptions: MutationOptions<
    OutgoingResponse,
    AxiosError,
    OutgoingRequest
  >
) => {
  return useMutation( 
    createOutgoingService,
    mutationOptions
  );
};
