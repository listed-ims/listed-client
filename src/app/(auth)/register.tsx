import React, { useState } from 'react'
import { Box, Button, Center, Column, Icon, Link, Pressable, Row, Text } from 'native-base'
import { Stack, router } from 'expo-router'
import { ScreenContainer } from '@listed-components/organisms'
import { FormControl, TextField } from '@listed-components/molecules'
import { Routes } from '@listed-constants'
import { ListedIcon } from '@listed-components/atoms'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useUserRegistrationMutation } from '@listed-hooks'
import { RegistrationCredentials } from '@listed-types'
import { useAuth } from '@listed-contexts'


const Registration = () => {

  const [errors, setErrors] = React.useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    if (formData.name === "") {
      handleErrors("Please enter name.", "name");
      return false;
    } else if (formData.username === "") {
      handleErrors("Please enter username.", "username")
      return false;
    } else if (formData.password === "") {
      handleErrors("Please enter password.", "password")
      return false;
    }else if (formData.confirmPassword === "") {
      handleErrors("Please enter password.", "confirmPassword")
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      handleErrors("Password did not match. Please try again.", "confirmPassword")
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

  const handleRegister = () => {
    if (validate()) {
      registrationService({ name: formData.name, username: formData.username, password: formData.password } as RegistrationCredentials);
    }
  };

  const { login } = useAuth();

  const { mutate: registrationService, isError, isLoading, } = useUserRegistrationMutation({
    onSuccess: (data) => {
      const token = data.token;
      login(token);
      router.push(Routes.HOME);
    },
    onError: (error) => {
      console.log("User not created.");
      console.error({ ...error });
    },
  });

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Column flexGrow="1" justifyContent="center" marginBottom="12">
        <Center paddingY="16">
          <Row alignItems="center" space="2">
            <ListedIcon/>
            <Text 
            bold
            fontSize="lg"
            >
              Sign Up
            </Text>
            <Text 
            fontSize="lg"
            >
              to listed
            </Text>
          </Row>
        </Center>
        <Column>
            <FormControl
              label="Name"
              errorMessage={errors.name}
              isInvalid={errors.name !== ""}
            >
              <TextField
                onFocus={() => handleErrors("", "name")}
                onChangeText={(value) => handleOnchange(value, "name")}
                placeholder="Name" />
            </FormControl>
            <FormControl
              label="Username"
              errorMessage={errors.username}
              isInvalid={errors.username !== ""}
            >
              <TextField
                onFocus={() => handleErrors("", "username")}
                onChangeText={(value) => handleOnchange(value, "username")}
                placeholder="Username" />
            </FormControl>
            <FormControl
              helperText="Password must be at least 8 characters."
              label="Password"
              errorMessage={errors.password}
              isInvalid={errors.password !== ""}
            >
              <TextField
                onFocus={() => handleErrors("", "password")}
                onChangeText={(value) => handleOnchange(value, "password")}
                placeholder="Password"
              />
            </FormControl>
            <FormControl
              label="Confirm Password"
              errorMessage={errors.confirmPassword}
              isInvalid={errors.confirmPassword !== ""}
            >
              <TextField
                onFocus={() => handleErrors("", "confirmPassword")}
                onChangeText={(value) => handleOnchange(value, "confirmPassword")}
                placeholder="Re-enter Password"
              />
            </FormControl>
          </Column>
        </Column>
        <Row justifyContent="center" alignItems="center" paddingY="4">
            <Text>Already have an account? </Text>
            <Link onPress={() => router.push(Routes.LOGIN)} _text={{
              fontSize: "sm",
              color: "primary.700",
              fontWeight: "medium"
            }}>Sign In </Link>
        </Row>
        </KeyboardAwareScrollView>
          <Box background="white" paddingTop="4" paddingBottom="6">
            <Button
              onPress={() => { handleRegister() }}
            > SIGN UP </Button>
          </Box>
    </ScreenContainer>
  )
}

export default Registration