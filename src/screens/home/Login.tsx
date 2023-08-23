import React, { useContext, useState } from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { Box, Center, Column, Flex, Icon, Link, Pressable, Text, Image, Row } from 'native-base'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import FormControl from '../../components/FormControl'
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../../context/AuthProvider'
import { LoginCredentials } from '../../types/Logins'
import { loginService } from '../../services/UserService'
interface LoginProps {
  navigation: NativeStackNavigationProp<any>,
}

const Login = ({ navigation }: LoginProps) => {

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = React.useState(false);

  const { loginAuth } = useContext(AuthContext);


  const validate = () => {
    if (formData.username === "") {
      handleErrors("Please enter username.", "username");
      return false;
    } else if (formData.password === "") {
      handleErrors("Please enter password.", "password")
      return false;
    } else {
      return true;
    }
  };

  const handleErrors = (error: string, data: string) => {
    setErrors({ ...errors, [data]: error });
  };

  const handleOnchange = (value: string, data: string) => {
    setFormData({ ...formData, [data]: value });
  };

  const handleLogin = () => {
    if (validate()) {
      loginService({ username: formData.username, password: formData.password } as LoginCredentials)
        .then((response) => {
          const token = response.data.token;
          loginAuth(token);
          console.log("Login success.");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <ScreenContainer>
      <Flex flexDirection="column" height="full">
        <Center padding="12" >
          <Image size="32"
            alt="listed logo"
            source={require("../../assets/images/logo/listed.png")} />
          <Text bold fontSize="xs" >Get your inventory listed.</Text>
        </Center>
        <Box flexGrow={1}>
          <Column space="4">
            <FormControl
              label="Username"
              errorMessage={errors.username}
              isInvalid={errors.username !== ""}
            >
              <TextField
                onFocus={() => handleErrors("", "username")}
                onChangeText={(value) => handleOnchange(value, "username")}
                placeholder="Enter username..." />
            </FormControl>
            <FormControl
              label="Password"
              errorMessage={errors.password}
              isInvalid={errors.password !== ""}
            >
              <TextField
                onFocus={() => handleErrors("", "password")}
                onChangeText={(value) => handleOnchange(value, "password")}
                placeholder="Enter password..."
                type={show ? "text" : "password"}
                rightElement={<Pressable onPress={() => setShow(!show)}>
                  <Icon as={<Ionicons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.500" />
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
          <Button onPress={() => { handleLogin() }}> Login </Button>
          <Center>
            <Row justifyContent="center" alignItems="center" marginTop="4">
              <Text>Don't have an account? </Text>
              <Link onPress={() => { navigation.navigate("Registration") }} _text={{
                fontSize: "sm",
                color: "primary.700",
                fontWeight: "medium"
              }}>Sign Up. </Link>
            </Row>
          </Center>
        </Box>
      </Flex>
    </ScreenContainer>
  )
}

export default Login