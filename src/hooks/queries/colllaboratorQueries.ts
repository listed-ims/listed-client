import {
  GET_COLLABORATOR,
  GET_COLLABORATORS,
  GET_MEMBERSHIP,
} from "@listed-constants";
import {
  getCollaboratorDetailsService,
  getCollaboratorsService,
  getUserMembership,
} from "@listed-services";
import { MembershipResponse, MembershipStatus } from "@listed-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const fiveMinutes = 1000 * 60 * 5;
export const useGetCollaborators = (
  storeId: number,
  membershipStatus?: MembershipStatus,
  pageNumber?: number,
  pageSize?: number
) => {
  const query = useQuery<MembershipResponse[]>(
    [GET_COLLABORATORS, membershipStatus, { storeId, pageNumber, pageSize }],
    () =>
      getCollaboratorsService(storeId, membershipStatus, pageNumber, pageSize),
    {
      staleTime: fiveMinutes,
    }
  );
  return query;
};

export const useGetUserMembership = (storeId: number) => {
  return useQuery<MembershipResponse, AxiosError<{ message: string }>>(
    [GET_MEMBERSHIP, storeId],
    () => getUserMembership(storeId),
    {
      staleTime: fiveMinutes,
      enabled: !!storeId,
    }
  );
};

export const useGetCollaboratorDetails = (id: number) => {
  return useQuery<MembershipResponse, AxiosError<{ message: string }>>(
    [GET_COLLABORATOR, id],
    () => getCollaboratorDetailsService(id),
    {
      staleTime: fiveMinutes,
      enabled: !!id,
    }
  );
};
