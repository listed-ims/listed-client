import React, { useEffect } from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Text, VStack } from 'native-base'


interface HomeProps {
  navigation: NativeStackNavigationProp<any>,
}

const Home = ({ navigation }: HomeProps) => {

  return (
    <ScreenContainer>
      <Text alignSelf="center" fontSize="2xl">Home</Text>
      <VStack space="5">
        <Button onPress={() => {
          navigation.navigate("ProductManagement");
        }}>
          Product Management
        </Button>
        <Button onPress={() => {
          navigation.navigate("Collaborators");
        }}>
          Collaborators
        </Button>
      </VStack>
    </ScreenContainer>
  )
}

export default Home
