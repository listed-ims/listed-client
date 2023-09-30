import { Button } from "@listed-components/atoms"
import { FormControl, TextField } from "@listed-components/molecules"
import { KeyboardAwareScroll, Permissions, ScreenContainer } from "@listed-components/organisms"
import { GET_COLLABORATORS, Routes } from "@listed-constants"
import { useAuth } from "@listed-contexts"
import { useCreateCollaboratorMutation, useDebounce, useFormValidation, useValidateUsername } from "@listed-hooks"
import { stackHeaderStyles } from "@listed-styles"
import { MembershipRequest, UserPermission, ValidationRules } from "@listed-types"
import { useQueryClient } from "@tanstack/react-query"
import { Stack, router } from "expo-router"
import { Box, Column, HStack, Text, View } from "native-base"


const AddCollaborator = () => {
  const { userDetails } = useAuth()
  const queryClient = useQueryClient();

  const initialFormData = {
    username: "",
    permissions: [] as UserPermission[]
  }
  const validationRules: ValidationRules = {
    username: { required: true },
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

  const handlePermissionChange = (permissions: Set<UserPermission>) => {
    handleInputChange([...permissions], "permissions");
  }

  const handleSubmit = () => {
    if (validate() && !usernameIsValid?.valid) {
      addCollaborator({
        storeId: userDetails?.currentStoreId,
        username: formData.username,
        userPermissions: formData.permissions
      } as MembershipRequest)
    }
  }

  const debouncedUsername = useDebounce(formData.username, 300)

  const {
    data: usernameIsValid,
    isLoading: usernameIsLoading,
    isError: usernameIsError
  } = useValidateUsername(debouncedUsername || "")

  const {
    mutate: addCollaborator,
    isLoading: createCollaboratorIsLoading,
    isError: createCollaboratorIsError,
  } = useCreateCollaboratorMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_COLLABORATORS] })
      router.push(Routes.COLLABORATORS)
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    }
  })


  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("New Collaborator")} />
      <KeyboardAwareScroll elementOnTopOfKeyboard={
        <Box background="white" paddingTop="4" paddingBottom="6">
          <Button size="lg"
            onPress={handleSubmit}
          >SEND INVITE</Button>
        </Box>
      }>
        <HStack py="4">
          <Text fontSize="lg" fontWeight="semibold">
            Enter Collaborator Details
          </Text>
        </HStack>
        <Column space="4">
          <FormControl
            label="Username"
            errorMessage={errors.username ||
              (usernameIsValid?.valid
                ? "Username cannot be found."
                : undefined)
            }
            isInvalid={!!errors.username || usernameIsValid?.valid}
          >
            <TextField
              placeholder="Enter collaborator username"
              onChangeText={(value) => handleInputChange(value, "username")}
            />
          </FormControl>
          <View>
            <Text fontWeight="medium">Permissions</Text>
            {!!errors.permissions && <FormControl
              children={undefined}
              marginTop="-2"
              errorMessage={errors.permissions}
              isInvalid={!!errors.permissions}
            />}
            <Permissions marginLeft="4" handleSelectPermission={handlePermissionChange} />
          </View>
        </Column>
      </KeyboardAwareScroll>
    </ScreenContainer>
  )
}

export default AddCollaborator