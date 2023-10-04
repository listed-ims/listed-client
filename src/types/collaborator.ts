import { PermissionCategory } from "@listed-constants";
import { UserResponse } from "./user";

export enum UserPermission {
  OWNER = "OWNER",
  ADD_COLLABORATOR = "ADD_COLLABORATOR",
  UPDATE_COLLABORATOR = "UPDATE_COLLABORATOR",
  DELETE_COLLABORATOR = "DELETE_COLLABORATOR",
  VIEW_COLLABORATORS = "VIEW_COLLABORATORS",
  VIEW_COLLABORATOR_DETAILS = "VIEW_COLLABORATOR_DETAILS",

  ADD_PRODUCT = "ADD_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  VIEW_PRODUCT_DETAILS = "VIEW_PRODUCT_DETAILS",
  DELETE_PRODUCT = "DELETE_PRODUCT",

  ADD_INCOMING = "ADD_INCOMING",
  GET_INCOMING_DETAILS = "GET_INCOMING_DETAILS",

  ADD_OUTGOING_SOLD = "ADD_OUTGOING_SOLD",
  ADD_OUTGOING_DEFECTS = "ADD_OUTGOING_DEFECTS",
  ADD_OUTGOING_EXPIRED = "ADD_OUTGOING_EXPIRED",
  ADD_OUTGOING_LOST = "ADD_OUTGOING_LOST",
  ADD_OUTGOING_CONSUMED = "ADD_OUTGOING_CONSUMED",
  GET_OUTGOING_DETAILS = "GET_OUTGOING_DETAILS",

  GET_TRANSACTIONS_LIST = "GET_TRANSACTIONS_LIST",
}

export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  DECLINED = "DECLINED",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
}

export interface MembershipResponse {
  id: number;
  user: UserResponse;
  permissions: UserPermission[];
  membershipStatus: MembershipStatus;
}

export interface MembershipRequest {
  storeId: number;
  username: string;
  userPermissions: UserPermission[];
}

export const UserPermissionMap = {
  ADD_COLLABORATOR: {
    permission: UserPermission.ADD_COLLABORATOR,
    description: "Add collaborator.",
    category: PermissionCategory.COLLABORATORS,
  },
  UPDATE_COLLABORATOR: {
    permission: UserPermission.UPDATE_COLLABORATOR,
    description: "Update collaborator.",
    category: PermissionCategory.COLLABORATORS,
  },
  DELETE_COLLABORATOR: {
    permission: UserPermission.DELETE_COLLABORATOR,
    description: "Remove collaborator.",
    category: PermissionCategory.COLLABORATORS,
  },
  VIEW_COLLABORATORS: {
    permission: UserPermission.VIEW_COLLABORATORS,
    description: "View collaborators list.",
    category: PermissionCategory.COLLABORATORS,
  },
  VIEW_COLLABORATOR_DETAILS: {
    permission: UserPermission.VIEW_COLLABORATOR_DETAILS,
    description: "View collaborator details.",
    category: PermissionCategory.COLLABORATORS,
  },

  ADD_PRODUCT: {
    permission: UserPermission.ADD_PRODUCT,
    description: "Add product.",
    category: PermissionCategory.PRODUCTS,
  },
  UPDATE_PRODUCT: {
    permission: UserPermission.UPDATE_PRODUCT,
    description: "Update product details.",
    category: PermissionCategory.PRODUCTS,
  },
  VIEW_PRODUCT_DETAILS: {
    permission: UserPermission.VIEW_PRODUCT_DETAILS,
    description: "View product details.",
    category: PermissionCategory.PRODUCTS,
  },
  DELETE_PRODUCT: {
    permission: UserPermission.DELETE_PRODUCT,
    description: "Delete product.",
    category: PermissionCategory.PRODUCTS,
  },

  ADD_INCOMING: {
    permission: UserPermission.ADD_INCOMING,
    description: "Perform incoming transaction.",
    category: PermissionCategory.INCOMING,
  },
  GET_INCOMING_DETAILS: {
    permission: UserPermission.GET_INCOMING_DETAILS,
    description: "Get incoming details.",
    category: PermissionCategory.INCOMING,
  },

  ADD_OUTGOING_SOLD: {
    permission: UserPermission.ADD_OUTGOING_SOLD,
    description: "Out items as sold.",
    category: PermissionCategory.OUTGOING,
  },
  ADD_OUTGOING_DEFECTS: {
    permission: UserPermission.ADD_OUTGOING_DEFECTS,
    description: "Out items as defects.",
    category: PermissionCategory.OUTGOING,
  },
  ADD_OUTGOING_EXPIRED: {
    permission: UserPermission.ADD_OUTGOING_EXPIRED,
    description: "Out items as expired.",
    category: PermissionCategory.OUTGOING,
  },
  ADD_OUTGOING_LOST: {
    permission: UserPermission.ADD_OUTGOING_LOST,
    description: "Out items as lost.",
    category: PermissionCategory.OUTGOING,
  },
  ADD_OUTGOING_CONSUMED: {
    permission: UserPermission.ADD_OUTGOING_CONSUMED,
    description: "Out items as consumed.",
    category: PermissionCategory.OUTGOING,
  },
  GET_OUTGOING_DETAILS: {
    permission: UserPermission.GET_OUTGOING_DETAILS,
    description: "Get outgoing details.",
    category: PermissionCategory.OUTGOING,
  },

  GET_TRANSACTIONS_LIST: {
    permission: UserPermission.GET_TRANSACTIONS_LIST,
    description: "Get transactions list.",
    category: PermissionCategory.TRANSACTIONS,
  },
} as const;
