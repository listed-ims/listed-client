import { PermissionCategory } from "@listed-constants";
import { UserPermission, UserPermissionMap } from "@listed-types";

export const hasPermission = (
  userPermissions: UserPermission[],
  screenPermission: UserPermission
) => {
  if (!userPermissions) return;
  if (userPermissions.includes(UserPermission.OWNER)) return true;
  return userPermissions.includes(screenPermission);
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
