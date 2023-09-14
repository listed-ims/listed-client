import React from 'react'
import { Box, Center, Column, Link, Row, Text } from 'native-base'
import { Stack, router } from 'expo-router'
import { ScreenContainer } from '@listed-components/organisms'
import { FormControl, TextField } from '@listed-components/molecules'
import { Routes } from '@listed-constants'
import { Button, ListedIcon } from '@listed-components/atoms'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormValidation, useUserRegistrationMutation } from '@listed-hooks'
import { RegistrationCredentials, ValidationRules } from '@listed-types'
import { useAuth } from '@listed-contexts'


const Registration = () => {
  const { login } = useAuth();

  const initialFormData = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validationRules: ValidationRules = {
    name: { required: true },
    username: { required: true },
    password: {
      required: true,
      custom: (value: string) => { return value.length >= 8 },
      customErrorMessage: "Password must be at least 8 characters.",
    },
    confirmPassword: {
      custom: (value: string) => { return value === formData.password },
      customErrorMessage: "Password did not match. Please try again.",
    }
  };

  const {
    formData,
    errors,
    validate,
    handleInputChange
  } = useFormValidation(
    initialFormData,
    validationRules
  );

  const handleRegister = () => {
    if (validate()) {
      registrationService({
        name: formData.name,
        username: formData.username,
        password: formData.password
      } as RegistrationCredentials);
    }
  };

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
              <ListedIcon />
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
              isInvalid={!!errors.name}
            >
              <TextField
                onChangeText={(value) => handleInputChange(value, "name")}
                placeholder="Name" />
            </FormControl>
            <FormControl
              label="Username"
              errorMessage={errors.username}
              isInvalid={!!errors.username}
            >
              <TextField
                onChangeText={(value) => handleInputChange(value, "username")}
                placeholder="Username" />
            </FormControl>
            <FormControl
              helperText="Password must be at least 8 characters."
              label="Password"
              errorMessage={errors.password}
              isInvalid={!!errors.password}
            >
              <TextField
                type="password"
                onChangeText={(value) => handleInputChange(value, "password")}
                placeholder="Password"
              />
            </FormControl>
            <FormControl
              label="Confirm Password"
              errorMessage={errors.confirmPassword}
              isInvalid={!!errors.confirmPassword}
            >
              <TextField
                type="password"
                onChangeText={(value) => handleInputChange(value, "confirmPassword")}
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
          onPress={handleRegister}
        > SIGN UP </Button>
      </Box>
    </ScreenContainer>
  )
}

export default Registration