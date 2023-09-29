import { MembershipResponse } from "@listed-types";

export const setCollaboratorsCurrentUserFirst = (
  collaborators: MembershipResponse[] | undefined,
  currentUserId: number
) => {
  if (!collaborators) return [];
  const collaboratorList = [...collaborators];

  const currentUser = collaboratorList.find(
    (collaborator) => collaborator.user.id === currentUserId
  );
  if (currentUser != undefined) {
    collaboratorList.splice(collaboratorList.indexOf(currentUser!), 1);
  }

  return currentUser ? [currentUser, ...collaboratorList] : collaboratorList;
};
