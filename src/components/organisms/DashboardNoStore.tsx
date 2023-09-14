import { AddStoreIcon } from "@listed-components/atoms";
import { CreateStoreCard } from "@listed-components/molecules";
import { Routes } from "@listed-constants";
import { router } from "expo-router";
import { Center, Column, Text } from "native-base";

interface DashboardNoStoreProps {
  username?: string;
}

const DashboardNoStore= ({ username }: DashboardNoStoreProps) => {
  
  return (
    <Column>
      <Text 
      paddingTop="6" 
      fontWeight="medium" 
      fontSize="md"
      >
      <Text color="muted.400">Welcome </Text>
        {username}
      </Text>
      <Text
      fontSize="xl" 
      fontWeight="bold"
      textAlign="center"
      paddingTop="8"
      >
        There’s nothing here yet.</Text>
      <Center paddingY="6">
        <AddStoreIcon/>
      </Center>
      <CreateStoreCard onPress={()=>{
            router.push(Routes.NEW_STORE)
          }}
      />
    </Column>
  )
  }
  
  export default DashboardNoStore