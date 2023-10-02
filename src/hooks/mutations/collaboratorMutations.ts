import { addCollaboratorService } from "@listed-services";
import { MembershipRequest, MembershipResponse } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateCollaboratorMutation = (
  mutationOptions: MutationOptions<
    MembershipResponse,
    AxiosError<{ message: string }>,
    MembershipRequest
  >
) => {
  return useMutation(addCollaboratorService, mutationOptions);
};
