import { Button, PeopleIcon } from "@listed-components/atoms"
import { PermissionDetails, ScreenContainer, renderUnauthorizedModal } from "@listed-components/organisms"
import { Routes } from "@listed-constants"
import { useAuth } from "@listed-contexts"
import { useGetCollaboratorDetails } from "@listed-hooks"
import { stackHeaderStyles } from "@listed-styles"
import { UserPermission } from "@listed-types"
import { hasPermission, ownerOrCollaborator, } from "@listed-utils"
import { Stack, router, useLocalSearchParams } from "expo-router"
import { Badge, Center, Column, Heading, ScrollView, Text } from "native-base"


const CollaboratorDetails = () => {
  const { userMembership } = useAuth();
  const { id } = useLocalSearchParams();

  const {
    data: collaboratorDetails,
    isError: collaboratorDetailsError,
    isFetching: collaboratorDetailsFetching,
  } = useGetCollaboratorDetails(Number(id))

  const handleAuthorization = () => {
    return renderUnauthorizedModal(
      !hasPermission(
        userMembership?.permissions!,
        UserPermission.VIEW_COLLABORATOR_DETAILS
      ))
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
                }
              >
                EDIT
              </Button>
              <Button variant="warnOutline">
                REMOVE
              </Button>
            </>
          }
        </Column>
      </ScrollView>
    </ScreenContainer>
  )
}

export default CollaboratorDetails