import { UserPermission } from "@listed-types";

export const hasPermission = (
  userPermissions: UserPermission[],
  screenPermission: UserPermission
) => {
  if (userPermissions.includes(UserPermission.OWNER)) return true;
  return userPermissions.includes(screenPermission);
};

