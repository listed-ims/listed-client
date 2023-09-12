import React, { useState } from 'react'
import { Box, Center, Column, View, Icon, Link, Pressable, Text, Row } from 'native-base'
import { Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@listed-contexts';
import { LoginCredentials } from '@listed-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenContainer } from '@listed-components/organisms';
import { Button, ListedLogo } from '@listed-components/atoms';
import { FormControl, TextField } from '@listed-components/molecules';
import { useUserLoginMutation } from '@listed-hooks';
import { Routes } from '@listed-constants';

const Login = () => {
  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = React.useState(false);

  const { login } = useAuth();


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
      loginService({ username: formData.username, password: formData.password } as LoginCredentials);
    }
  }

  const { mutate: loginService, isError, isLoading } = useUserLoginMutation({
    onSuccess: (data) => {
      const token = data.token;
      login(token);
      router.push(Routes.HOME);
    },
    onError: (error) => {
      console.log('Login error.')
      console.error({ ...error });
    }
  });


  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Column flexGrow="1" justifyContent="center" marginBottom="12">
          <Center marginBottom="12">
            <ListedLogo />
            <View marginY={3} />
            <Row>
              <Text bold fontSize="lg">Sign in </Text>
              <Text fontSize="lg">to listed.</Text>
            </Row>
          </Center>
          <Column>
            <FormControl
              errorMessage={errors.username}
              isInvalid={errors.username !== ""}
            >
              <TextField
                onFocus={() => handleErrors("", "username")}
                onChangeText={(value) => handleOnchange(value, "username")}
                placeholder="Username" />
            </FormControl>
            <FormControl
              errorMessage={errors.password}
              isInvalid={errors.password !== ""}
            >
              <TextField
                onFocus={() => handleErrors("", "password")}
                onChangeText={(value) => handleOnchange(value, "password")}
                placeholder="Password"
                type={show ? "text" : "password"}
                rightElement={<Pressable onPress={() => setShow(!show)}>
                  <Icon as={<Ionicons name={show ? "eye" : "eye-off"} />}
                    size={5}
                    mr="2"
                    color="muted.500" />
                </Pressable>}
              />
            </FormControl>
          </Column>
        </Column>
        <Row justifyContent="center" alignItems="center" paddingY="4">
          <Text>Don't have an account? </Text>
          <Link onPress={() => router.push(Routes.REGISTER)} _text={{
            fontSize: "sm",
            color: "primary.700",
            fontWeight: "medium"
          }}>Sign Up. </Link>
        </Row>
      </KeyboardAwareScrollView>
      <Box background="white" paddingY="4">
        <Button onPress={() => { handleLogin() }}> Login </Button>
      </Box>
    </ScreenContainer>
  )
}

export default Login