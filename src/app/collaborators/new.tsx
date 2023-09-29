import { Button } from "@listed-components/atoms"
import { FormControl, TextField } from "@listed-components/molecules"
import { KeyboardAwareScroll, Permissions, ScreenContainer } from "@listed-components/organisms"
import { stackHeaderStyles } from "@listed-styles"
import { Stack } from "expo-router"
import { Box, Column, HStack, Text } from "native-base"


const AddCollaborator = () => {
  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("New Collaborator")} />
      <KeyboardAwareScroll elementOnTopOfKeyboard={
        <Box background="white" paddingTop="4" paddingBottom="6">
          <Button size="lg"
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
          >
            <TextField placeholder="Enter collaborator username" />
          </FormControl>
          <FormControl label="Permissions">
            <Permissions />
          </FormControl>
        </Column>
      </KeyboardAwareScroll>
    </ScreenContainer>
  )
}

export default AddCollaborator