import {
  acceptOrDeclineMembership,
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

export const useUpdateUserMembershipMutation = (
  mutationOptions: MutationOptions<
    MembershipResponse,
    AxiosError<{ message: string }>,
    [number, UserPermission[] | undefined, MembershipStatus | undefined]
  >
) => {
  return useMutation(
    ([id, permissions, membershipStatus]) =>
      updateCollaboratorService(id, membershipStatus, permissions),
    mutationOptions
  );
};

export const useAcceptOrDeclineMembershipMutation = (
  mutationOptions: MutationOptions<
    MembershipResponse,
    AxiosError<{ message: string }>,
    [number, MembershipStatus]
  >
) => {
  return useMutation(
    ([id, membershipStatus]) => acceptOrDeclineMembership(id, membershipStatus),
    mutationOptions
  );
};
