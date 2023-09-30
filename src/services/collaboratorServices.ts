import {
  MembershipRequest,
  MembershipResponse,
  MembershipStatus,
} from "@listed-types";
import { axiosInstance } from "./axios";

export const getCollaboratorsService = async (
  storeId: number,
  membershipStatus?: MembershipStatus,
  pageNumber?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get("collaborators", {
      params: {
        storeId: storeId,
        membershipStatus: membershipStatus,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return response.data as MembershipResponse[];
  } catch (error) {
    throw error;
  }
};

export const addCollaboratorService = async (
  membershipRequest: MembershipRequest
) => {
  try {
    const response = await axiosInstance.post(
      "collaborators",
      membershipRequest
    );
    return response.data as MembershipResponse;
  } catch (error) {
    throw error;
  }
};
