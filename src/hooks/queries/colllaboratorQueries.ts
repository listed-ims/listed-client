import { GET_COLLABORATORS, GET_PERMISSIONS } from "@listed-constants";
import { getCollaboratorsService } from "@listed-services";
import {
  MembershipResponse,
  MembershipStatus,
  UserPermission,
} from "@listed-types";
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

export const useGetUserPermissions = (storeId: number, userId: number) => {
  return useQuery<UserPermission[]>(
    [GET_PERMISSIONS, { storeId, userId }],
    () =>
      getCollaboratorsService(
        storeId,
        undefined,
        undefined,
        undefined,
        userId
      ).then((response) => {
        return response[0].permissions;
      }),
    {
      staleTime: Infinity,
      enabled: !!storeId && !!userId,
    }
  );
};
