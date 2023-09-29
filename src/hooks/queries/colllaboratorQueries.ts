import { GET_COLLABORATORS } from "@listed-constants";
import { getCollaboratorsService } from "@listed-services";
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
