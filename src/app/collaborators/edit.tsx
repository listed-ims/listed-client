import { Button } from "@listed-components/atoms"
import { Permissions, ScreenContainer } from "@listed-components/organisms"
import { useGetCollaboratorDetails } from "@listed-hooks"
import { stackHeaderStyles } from "@listed-styles"
import { Stack, useLocalSearchParams } from "expo-router"
import { Box, Column, HStack, Row, ScrollView, Text, View } from "native-base"

const CollaboratorEdit = () => {
  const { id } = useLocalSearchParams();

  const {
    data: collaboratorDetails,
    isFetching: collaboratorDetailsFetching,
    isError: collaboratorDetailsError,
  } = useGetCollaboratorDetails(Number(id))

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Edit Collaborator")} />
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
            <Permissions selectedPermissions={
              new Set([...collaboratorDetails?.permissions!])
            }
              marginLeft="4"
              handleSelectPermission={() => { console.log("hello") }}
            />
          </View>
        </Column>
      </ScrollView>
      <Box background=" white" paddingTop="4" paddingBottom="6">
        <Row space="4" >
          <Button flex="1" >SAVE</Button>
          <Button flex="1" variant="outline">CANCEL</Button>
        </Row>
      </Box>
    </ScreenContainer>
  )
}

export default CollaboratorEdit