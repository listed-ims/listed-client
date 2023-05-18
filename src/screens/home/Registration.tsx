import React from 'react'
import { Button, Text } from 'native-base'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ScreenContainer from '../../layout/ScreenContainer'


interface RegistrationProps {
  navigation: NativeStackNavigationProp<any>
}

const Registration = ({ navigation }: RegistrationProps) => {
  return (
    <ScreenContainer>
      <Text fontSize="xs">Registration</Text>
      <Button
        onPress={() => {
          navigation.navigate("Login");
        }}>
        Registration
      </Button>
    </ScreenContainer>
  )
}

export default Registration