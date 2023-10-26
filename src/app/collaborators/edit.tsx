import { Button } from "@listed-components/atoms"
import { FormControl, Toast } from "@listed-components/molecules"
import { Permissions, ScreenContainer } from "@listed-components/organisms"
import { GET_COLLABORATOR, GET_COLLABORATORS, Routes } from "@listed-constants"
import { useAuth } from "@listed-contexts"
import { useFormValidation, useGetCollaboratorDetails, useUpdateUserMembershipMutation } from "@listed-hooks"
import { stackHeaderStyles } from "@listed-styles"
import { MembershipStatus, UserPermission, ValidationRules } from "@listed-types"
import { hasPermission } from "@listed-utils"
import { useQueryClient } from "@tanstack/react-query"
import { Stack, router, useLocalSearchParams } from "expo-router"
import { Box, Column, HStack, Row, ScrollView, Text, View, useToast } from "native-base"
import { useEffect } from "react"

const CollaboratorEdit = () => {
  const { id } = useLocalSearchParams();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { userMembership } = useAuth();

  useEffect(() => {
    if (!hasPermission(
      userMembership!,
      UserPermission.UPDATE_COLLABORATOR
    ))
      router.replace(Routes.UNAUTHORIZED)
  }, [userMembership])

  const {
    data: collaboratorDetails,
    isFetching: collaboratorDetailsFetching,
    isError: collaboratorDetailsError,
  } = useGetCollaboratorDetails(Number(id))

  const initialFormData = {
    permissions: collaboratorDetails?.permissions || []
  }

  const validationRules: ValidationRules = {
    permissions: {
      custom(value) {
        return value.length > 0
      },
      customErrorMessage: "Please select at least one permission."
    }
  }

  const { formData, errors, validate, handleInputChange } = useFormValidation(
    initialFormData,
    validationRules
  )

  const isInactive = collaboratorDetails?.membershipStatus === MembershipStatus.INACTIVE

  const {
    mutate: updateCollaborator,
  } = useUpdateUserMembershipMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries([GET_COLLABORATORS]);
      queryClient.setQueriesData([GET_COLLABORATOR, data.id], data);
      toast.show({
        render: () => {
          return <Toast message="Collaborator permissions updated." />
        }
      });
      router.back();
    }
  })

  const {
    mutate: updateCollaboratorStatus,
  } = useUpdateUserMembershipMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries([GET_COLLABORATORS]);
      queryClient.setQueriesData([GET_COLLABORATOR, data.id], data);
      toast.show({
        render: () => {
          return <Toast message="Collaborator is invited again." />
        }
      });
      router.back();
    }
  })

  const handleSave = () => {
    if (validate()) {
      updateCollaborator([
        Number(id),
        formData.permissions,
        undefined
      ])
    }
  }

  const handleInviteAgain = () => {
    if (validate()) {
      updateCollaboratorStatus([
        Number(id),
        formData.permissions,
        MembershipStatus.PENDING
      ]);
    }
  }

  const handlePermissionChange = (permissions: Set<UserPermission>) => {
    handleInputChange([...permissions], "permissions")
  }

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles(
        `${isInactive
          ? "Invite Again"
          : "Edit Collaborator"}`
      )} />
      <ScrollView>
        <HStack py="4">
          <Text fontSize="lg" fontWeight="semibold">
            Enter Collaborator Details
          </Text>
        </HStack>
        <Column space="4">
          <View>
            <Text fontWeight="medium">Collaborator</Text>
            <Column padding="2"
              marginTop="1"
              borderWidth="1"
              borderColor="muted.200"
              borderRadius="lg"
            >
              <Row>
                <Text flex="1">Name:</Text>
                <Text fontWeight="bold" flex="1">
                  {collaboratorDetails?.user.name}
                </Text>
              </Row>
              <Row>
                <Text flex="1">Username:</Text>
                <Text fontWeight="bold" flex="1">
                  {collaboratorDetails?.user.username}
                </Text>
              </Row>
            </Column>
          </View>
          <View>
            <Text>Permissions</Text>
            {!!errors.permissions && <FormControl
              children={undefined}
              marginTop="-2"
              errorMessage={errors.permissions}
              isInvalid={!!errors.permissions}
            />}
            <Permissions permissions={
              new Set([...collaboratorDetails?.permissions!])
            }
              marginLeft="4"
              handleSelectPermission={handlePermissionChange}
            />
          </View>
        </Column>
      </ScrollView>
      <Box background=" white" paddingTop="4" paddingBottom="6">
        <Row space="4" >
          {isInactive
            ? <Button flex="1"
              onPress={handleInviteAgain}
            >INVITE AGAIN</Button>
            : <>
              <Button flex="1"
                onPress={handleSave} >SAVE</Button>
              <Button flex="1" variant="outline"
                onPress={() => {
                  router.back();
                }}
              >CANCEL</Button>
            </>
          }
        </Row>
      </Box>
    </ScreenContainer>
  )
}

export default CollaboratorEdit