import {
  GET_COLLABORATOR,
  GET_COLLABORATORS,
  GET_MEMBERSHIP,
} from "@listed-constants";
import {
  getCollaboratorDetailsService,
  getCollaboratorsService,
} from "@listed-services";
import { MembershipResponse, MembershipStatus } from "@listed-types";
import { useQuery } from "@tanstack/react-query";

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

export const useGetUserMembership = (storeId: number, userId: number) => {
  return useQuery<MembershipResponse>(
    [GET_MEMBERSHIP, { storeId, userId }],
    () =>
      getCollaboratorsService(
        storeId,
        undefined,
        undefined,
        undefined,
        userId
      ).then((response) => {
        return response[0];
      }),
    {
      staleTime: fiveMinutes,
      enabled: !!storeId && !!userId,
    }
  );
};

export const useGetCollaboratorDetails = (id: number) => {
  return useQuery<MembershipResponse>(
    [GET_COLLABORATOR, id],
    () => getCollaboratorDetailsService(id),
    {
      staleTime: fiveMinutes,
      enabled: !!id,
    }
  );
};
