import React, { useState } from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { Box, Center, Column, Flex, Icon, Link, Pressable, Text } from 'native-base'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import FormControl from '../../components/FormControl'
import { Ionicons } from "@expo/vector-icons";

interface LoginProps {
  navigation: NativeStackNavigationProp<any>,
}

const Login = ({ navigation }: LoginProps) => {

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const [show, setShow] = React.useState(false);

  return (
    <ScreenContainer>
    <Flex flexDirection="column" height="full" paddingTop="4">
      
        <Text bold alignSelf="center" fontSize="md" >Get your inventory listed.</Text>
      
      <Box flexGrow={1}>
        <Column space="5">
          <FormControl label="Username">
            <TextField value={username} onChangeText={setUsername} placeholder="Enter username..."/>
          </FormControl>
          <FormControl label="Password">
            <TextField value={password} onChangeText={setPassword} placeholder="Enter password..." 
              type={show ? "text" : "password"}
              rightElement={<Pressable onPress={() => setShow(!show)}>
              <Icon as={<Ionicons name={show ? "eye-outline" : "eye-off-outline"} />} size={5} mr="2" color="muted.400" />
            </Pressable>}
            />
          </FormControl>

          <Link isUnderlined={false} alignSelf="center" _text={{
              fontSize: "sm",
              color: "primary.700",
              fontWeight: "medium"
          }}>Forgot your password?
          </Link>
        </Column>
      </Box>

      <Box width="full">
        <Button onPress={() => { navigation.navigate("Registration") }}> Login </Button>
        <Center marginTop="5">
          <Text>Don't have an account?
            <Link onPress={() =>  {
              navigation.navigate("Home")
            }}
                _text={{
                fontSize: "sm",
                color: "primary.700",
                fontWeight: "medium"
            }}> Sign Up.
            </Link>
          </Text>
        </Center>
      </Box>
    </Flex>
    </ScreenContainer>
  )
}

export default Login