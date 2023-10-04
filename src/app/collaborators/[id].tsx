import { Button, PeopleIcon } from "@listed-components/atoms"
import { Toast } from "@listed-components/molecules"
import { PermissionDetails, RemoveCollaboratorModal, ScreenContainer, renderUnauthorizedModal } from "@listed-components/organisms"
import { GET_COLLABORATOR, GET_COLLABORATORS, Routes } from "@listed-constants"
import { useAuth } from "@listed-contexts"
import { useGetCollaboratorDetails, useUpdateUserMembershipStatusMutation } from "@listed-hooks"
import { stackHeaderStyles } from "@listed-styles"
import { MembershipStatus, ModalContent, UserPermission } from "@listed-types"
import { hasPermission, ownerOrCollaborator, } from "@listed-utils"
import { useQueryClient } from "@tanstack/react-query"
import { Stack, router, useLocalSearchParams } from "expo-router"
import { Badge, Center, Column, Heading, ScrollView, Text, useToast } from "native-base"
import { useState } from "react"


const CollaboratorDetails = () => {
  const { userMembership } = useAuth();
  const { id } = useLocalSearchParams();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [modalContent, setModalContent] = useState<ModalContent>({} as ModalContent)

  const {
    data: collaboratorDetails,
    isError: collaboratorDetailsError,
    isFetching: collaboratorDetailsFetching,
  } = useGetCollaboratorDetails(Number(id))

  const isInactive = collaboratorDetails?.membershipStatus === MembershipStatus.INACTIVE;
  const isPending = collaboratorDetails?.membershipStatus === MembershipStatus.PENDING;

  const {
    mutate: updateMembershipStatus
  } = useUpdateUserMembershipStatusMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries([GET_COLLABORATORS]);
      queryClient.setQueriesData([GET_COLLABORATOR, data.id], data);
      router.back();
    }
  })

  const handleUpdateStatus = () => {
    updateMembershipStatus([
      Number(id),
      isPending
        ? MembershipStatus.DECLINED
        : MembershipStatus.INACTIVE
    ])
  }

  const handleAuthorization = () => {
    return renderUnauthorizedModal(
      !hasPermission(
        userMembership?.permissions!,
        UserPermission.VIEW_COLLABORATOR_DETAILS
      ))
  }
  const handleCancelRemove = () => {
    setModalContent({
      header: isPending ? "CANCEL INVITE" : "REMOVE COLLABORATOR",
      body: isPending
        ? "This will cancel the invitation to collaborator."
        : "This wil remove the collaborator from the store."
    })
    setShowRemoveModal(true);
  }

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Collaborator Details")} />
      {handleAuthorization()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column space="1" alignItems="center"
          marginBottom="4"
          marginTop="6"
        >
          <Center
            width="12"
            height="12"
            backgroundColor="primary.700"
            borderRadius="full">
            <PeopleIcon />
          </Center>
          <Heading fontSize="md">{collaboratorDetails?.user.name}</Heading>
          <Text>{collaboratorDetails?.user.username}</Text>
          <Badge variant="solid" colorScheme="success">
            {ownerOrCollaborator(collaboratorDetails?.permissions!)}
          </Badge>
          <Badge variant="solid"
            colorScheme={`${isPending
              ? "warning"
              : isInactive
                ? "error"
                : "info"}`}>
            {collaboratorDetails?.membershipStatus}
          </Badge>
        </Column>
        <PermissionDetails
          permissions={collaboratorDetails?.permissions!} />
        <Column width="full"
          space="4"
          marginY="6">
          {
            ownerOrCollaborator(collaboratorDetails?.permissions!) === "COLLABORATOR"
            &&
            <>
              <Button
                onPress={() =>
                  router.push(`${Routes.EDIT_COLLABORATOR}?id=${id}`)
                }>
                {
                  !isInactive
                    ? "EDIT PERMISSIONS"
                    : "INVITE AGAIN"
                }
              </Button>
              {!isInactive &&
                <Button variant="warnOutline"
                  onPress={handleCancelRemove}
                >
                  {isPending ? "CANCEL INVITE" : "REMOVE"}
                </Button>}
            </>
          }
        </Column>
        <RemoveCollaboratorModal
          modalContent={modalContent}
          isOpen={showRemoveModal}
          onConfirm={handleUpdateStatus}
          onCancel={() => { setShowRemoveModal(false) }} />
      </ScrollView>
    </ScreenContainer>
  )
}

export default CollaboratorDetails