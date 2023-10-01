import { MembershipResponse, MembershipStatus } from "@listed-types";

export const setCollaboratorsCurrentUserFirst = (
  collaborators: MembershipResponse[] | undefined,
  currentUserId: number,
  exclude?: MembershipStatus
) => {
  if (!collaborators) return [];
  const collaboratorList = [...collaborators];

  const currentUser = collaboratorList.find(
    (collaborator) => collaborator.user.id === currentUserId
  );
  if (currentUser != undefined) {
    collaboratorList.splice(collaboratorList.indexOf(currentUser!), 1);
  }
  if (exclude) {
    const filteredCollaborators = collaboratorList.filter(
      (collaborator) => collaborator.membershipStatus !== exclude
    );
    return currentUser
      ? [currentUser, ...filteredCollaborators]
      : filteredCollaborators;
  }

  return currentUser ? [currentUser, ...collaboratorList] : collaboratorList;
};
