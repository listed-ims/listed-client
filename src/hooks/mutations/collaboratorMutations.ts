import {
  addCollaboratorService,
  updateCollaboratorService,
} from "@listed-services";
import {
  MembershipRequest,
  MembershipResponse,
  MembershipStatus,
  UserPermission,
} from "@listed-types";
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

export const useUpdateUserPermissionMutation = (
  mutationOptions: MutationOptions<
    MembershipResponse,
    AxiosError<{ message: string }>,
    [number, UserPermission[]]
  >
) => {
  return useMutation(
    ([id, permissions]) =>
      updateCollaboratorService(id, undefined, permissions),
    mutationOptions
  );
};

export const useUpdateUserMembershipStatusMutation = (
  mutationOptions: MutationOptions<
    MembershipResponse,
    AxiosError<{ message: string }>,
    [number, MembershipStatus]
  >
) => {
  return useMutation(
    ([id, membershipStatus]) => updateCollaboratorService(id, membershipStatus),
    mutationOptions
  );
};
