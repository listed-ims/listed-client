import React, { useEffect, useState } from 'react'
import { Box, Center, Column, View, Icon, Link, Pressable, Text, Row } from 'native-base'
import { Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@listed-contexts';
import { LoginCredentials, ModalContent, ValidationRules } from '@listed-types';
import { ScreenContainer, InvalidLoginModal, KeyboardAwareScroll } from '@listed-components/organisms';
import { Button, ListedLogo } from '@listed-components/atoms';
import { FormControl, TextField } from '@listed-components/molecules';
import { useFormValidation, useGetUserDetails, useGetUserMembership, useUserLoginMutation } from '@listed-hooks';
import { Routes } from '@listed-constants';

const Login = () => {
  const [modalContent, setModalContent] = useState<ModalContent>({} as ModalContent)
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = useState(false);

  const { login, setUserDetails, setUserMembership, isLoggedIn } = useAuth();

  const initialFormData = {
    username: "",
    password: "",
  }

  const validationRules: ValidationRules = {
    username: { required: true },
    password: { required: true },
  }

  const {
    data: userDetails,
    isFetching: userDetailsFetching,
    isSuccess: userSuccess,
  } = useGetUserDetails(isLoggedIn);

  const {
    data: userMembership,
    isFetching: userMembershipFetching,
    isSuccess: userMembershipSuccess
  } = useGetUserMembership(userDetails?.currentStoreId!, userDetails?.id!);

  useEffect(() => {
    if (userSuccess) {
      setUserDetails(userDetails);
    }
    if (userMembershipSuccess) {
      setUserMembership(userMembership);
    }
  }, [userDetails, userMembership]);

  const {
    formData,
    errors,
    validate,
    handleInputChange
  } = useFormValidation(initialFormData, validationRules);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    if (validate()) {
      loginService({
        username: formData.username,
        password: formData.password
      } as LoginCredentials);
    }
  };

  const { mutate: loginService, isError, isLoading: loginLoading } = useUserLoginMutation({
    onSuccess: (data) => {
      const token = data.token;
      login(token);
    },
    onError: (error) => {
      if (error.code === "ERR_BAD_REQUEST") {
        setModalContent({
          header: "We couldn't log you in.",
          body: "The username and password you entered is incorrect. Please try again."
        })
      } else {
        setModalContent({
          header: "Connection Timeout.",
          body: "Please check your internet connection."
        })
      }
      setShowModal(true)
    }
  });


  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAwareScroll elementOnTopOfKeyboard={
        <Box background="white" paddingTop="4" paddingBottom="6">
          <Button 
          onPress={() => { handleLogin() }}
          isLoading = {loginLoading || userMembershipFetching || userDetailsFetching}
          isLoadingText= "SIGNING IN"
          > SIGN IN </Button>
        </Box>
      }>
        <Column
          flexGrow="1"
          justifyContent="center"
        >
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
              isInvalid={!!errors.username}
            >
              <TextField
                onChangeText={(value) => handleInputChange(value, "username")}
                placeholder="Username" />
            </FormControl>
            <FormControl
              errorMessage={errors.password}
              isInvalid={!!errors.password}
            >
              <TextField
                onChangeText={(value) => handleInputChange(value, "password")}
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
      </KeyboardAwareScroll>
      <InvalidLoginModal
        modalContent={modalContent}
        isOpen={showModal}
        onClose={closeModal}
      />
    </ScreenContainer>
  )
}

export default Login