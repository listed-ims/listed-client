import React from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Flex, Link, Text, VStack } from 'native-base'
import Button from '../../components/Button'
import TextField from '../../components/TextField'


interface HomeProps {
  navigation: NativeStackNavigationProp<any>,
}

const Home = ({ navigation }: HomeProps) => {

  return (
    <ScreenContainer>
      <Text alignSelf="center" fontSize="2xl">Home</Text>
      <VStack space="5" overflowX="auto">
        <Button width="1/2"
          onPress={() => {
            navigation.navigate("ProductManagement");
          }}>
          Product Management
        </Button>
        <Button onPress={() => {
          navigation.navigate("Collaborators");
        }}>
          Collaborators
        </Button>
        <Flex flexDirection="row" >
          <Button marginRight="2" flexGrow={1}>Hello</Button>
          <Button marginLeft="2" flexGrow={1} variant="outline">Hi</Button>
        </Flex>
        <TextField isInvalid />
        <TextField />
        <TextField isDisabled />
        <Link _text={{
          fontSize: "md",
          color: "primary.700",
          fontWeight: "medium"
        }}>
          Hello, I'm a Link
        </Link>
      </VStack>
    </ScreenContainer>
  )
}

export default Home
