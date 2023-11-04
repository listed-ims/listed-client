import {
  MembershipRequest,
  MembershipResponse,
  MembershipStatus,
  UserPermission,
} from "@listed-types";
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

export const updateCollaboratorService = async (
  id: number,
  membershipStatus?: MembershipStatus,
  permissions?: UserPermission[]
) => {
  try {
    const response = await axiosInstance.put(
      `collaborators/${id}`,
      permissions,
      {
        params: {
          membershipStatus: membershipStatus,
        },
      }
    );
    return response.data as MembershipResponse;
  } catch (error) {
    throw error;
  }
};

export const getCollaboratorDetailsService = async (id: number) => {
  try {
    const response = await axiosInstance.get(`collaborators/${id}`);
    return response.data as MembershipResponse;
  } catch (error) {
    throw error;
  }
};

export const getUserMembership = async (storeId?: number) => {
  try {
    const response = await axiosInstance.get("collaborators/membership", {
      params: {
        storeId: storeId,
      },
    });
    return response.data as MembershipResponse;
  } catch (error) {
    throw error;
  }
};

export const acceptOrDeclineMembership = async (
  id: number,
  membershipStatus: MembershipStatus
) => {
  try {
    const response = await axiosInstance.put(
      `collaborators/membership/${id}`,
      null,
      {
        params: {
          membershipStatus: membershipStatus,
        },
      }
    );
    return response.data as MembershipResponse;
  } catch (error) {
    throw error;
  }
};
