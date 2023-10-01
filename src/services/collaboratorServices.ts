import { MembershipResponse, MembershipStatus } from "@listed-types";
import { axiosInstance } from "./axios";

export const getCollaboratorsService = async (
  storeId: number,
  membershipStatus?: MembershipStatus,
  pageNumber?: number,
  pageSize?: number,
  userId?: number
) => {
  try {
    const response = await axiosInstance.get("collaborators", {
      params: {
        storeId: storeId,
        membershipStatus: membershipStatus,
        pageNumber: pageNumber,
        pageSize: pageSize,
        userId: userId,
      },
    });
    return response.data as MembershipResponse[];
  } catch (error) {
    throw error;
  }
};
