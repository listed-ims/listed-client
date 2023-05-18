import React from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { Button, Text } from 'native-base'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface LoginProps {
  navigation: NativeStackNavigationProp<any>,
}

const Login = ({ navigation }: LoginProps) => {
  return (
    <ScreenContainer>
      <Text fontSize="xs">Login</Text>
      <Button onPress={() => {
        navigation.navigate("Registration")
      }}>
        Register
      </Button>
    </ScreenContainer>
  )
}

export default Login