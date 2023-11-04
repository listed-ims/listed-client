import React, { useEffect, useState } from 'react'
import { Box, Center, Column, Link, Row, Text } from 'native-base'
import { Stack, router } from 'expo-router'
import { KeyboardAwareScroll, ScreenContainer } from '@listed-components/organisms'
import { FormControl, TextField } from '@listed-components/molecules'
import { Routes } from '@listed-constants'
import { Button, ListedIcon } from '@listed-components/atoms'
import { useDebounce, useFormValidation, useGetUserDetails, useGetUserMembership, useUserRegistrationMutation, useValidateUsername } from '@listed-hooks'
import { RegistrationCredentials, ValidationRules } from '@listed-types'
import { useAuth } from '@listed-contexts'


const Registration = () => {
  const { login, isLoggedIn, setUserDetails, setUserMembership } = useAuth();
  const [loadingButton, setLoadingButton] = useState(false)

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

  const {
    data: userDetails,
    isFetching: userDetailsFetching,
    isSuccess: userSuccess,
  } = useGetUserDetails(isLoggedIn);

  const {
    data: userMembership,
    isFetching: userMembershipFetching,
    isSuccess: userMembershipSuccess
  } = useGetUserMembership(userDetails?.currentStoreId!);

  useEffect(() => {
    if (userSuccess) {
      setUserDetails(userDetails);
    }
    if (userMembershipSuccess) {
      setUserMembership(userMembership);
      setLoadingButton(false);
    }
  }, [userDetails, userMembership]);

  const handleRegister = () => {
    if (validate() && usernameIsValid?.valid) {
      registrationService({
        name: formData.name,
        username: formData.username,
        password: formData.password
      } as RegistrationCredentials);
      setLoadingButton(true);
    }
  };

  const debouncedUsername = useDebounce(formData.username, 300)

  const {
    data: usernameIsValid,
    isLoading: usernameIsLoading,
    isError: usernameIsError
  } = useValidateUsername(debouncedUsername || "")

  const { mutate: registrationService, isError, isLoading, } = useUserRegistrationMutation({
    onSuccess: (data) => {
      const token = data.token;
      login(token);
    },
    onError: (error) => {
      console.log("User not created.");
      console.error({ ...error });
    },
  });


  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAwareScroll elementOnTopOfKeyboard={
        <Box background="white" paddingTop="4" paddingBottom="6">
          <Button
            onPress={handleRegister}
            isLoading={loadingButton}
            isLoadingText="SIGNING UP"
          > SIGN UP </Button>
        </Box>
      }>
        <Column flexGrow="1">
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
              errorMessage={errors.username ||
                (!usernameIsLoading && !usernameIsValid?.valid
                  ? "Username already exists."
                  : undefined)
              }
              isInvalid={!!errors.username || !usernameIsLoading && !usernameIsValid?.valid}
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
      </KeyboardAwareScroll>
    </ScreenContainer >
  )
}

export default Registration