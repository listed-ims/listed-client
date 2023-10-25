import { PermissionCategory } from "@listed-constants";
import {
  MembershipResponse,
  MembershipStatus,
  UserPermission,
  UserPermissionMap,
} from "@listed-types";

export const hasPermission = (
  userMembership: MembershipResponse,
  screenPermission: UserPermission
) => {
  if (!userMembership) return;
  if (userMembership.permissions.includes(UserPermission.OWNER)) return true;
  return (
    userMembership.permissions.includes(screenPermission) &&
    userMembership.membershipStatus !== MembershipStatus.INACTIVE
  );
};

export const ownerOrCollaborator = (userPermissions: UserPermission[]) => {
  if (!userPermissions) return "";
  if (userPermissions.includes(UserPermission.OWNER)) {
    return UserPermission.OWNER;
  } else {
    return "COLLABORATOR";
  }
};

export const filterPermissionsByCategory = (
  userPermissions: UserPermission[],
  category: PermissionCategory
) => {
  return userPermissions.filter((permission) => {
    if (permission) {
      return (
        category ===
        UserPermissionMap[permission as keyof typeof UserPermissionMap].category
      );
    }
  });
};
