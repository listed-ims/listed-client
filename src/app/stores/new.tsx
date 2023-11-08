import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { Column, Text, HStack, Box } from "native-base";
import { KeyboardAwareScroll, ScreenContainer } from "@listed-components/organisms";
import { Button, NewStoreIcon } from "@listed-components/atoms";
import { FormControl, TextField } from "@listed-components/molecules";
import { GET_STORES, GET_USER, Routes } from "@listed-constants";
import { StoreRequest, UserResponse } from "@listed-types";
import { useCreateStoreMutation, useGetUserMembership } from "@listed-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@listed-contexts";
import { stackHeaderStyles } from "@listed-styles";

const NewStore = () => {
  const queryClient = useQueryClient();
  const { userDetails, setUserDetails, setUserMembership } = useAuth();
  const [newUserDetails, setNewUserDetails] = useState({} as UserResponse)
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({
    name: "",
  });

  const handleErrors = (error: string, data: string) => {
    setErrors({ ...errors, [data]: error });
  };

  const handleOnchange = (value: string, data: string) => {
    setFormData({ ...formData, [data]: value });
  };

  const validate = () => {
    if (formData.name === "") {
      handleErrors("Please enter a store name.", "name");
      return false;
    } else {
      return true;
    }
  };

  const handleCreateStore = () => {
    if (validate()) {
      createStoreService({
        name: formData.name,
      } as StoreRequest);
    }
  };

  const {
    data: newMembershipDetails,
    isFetching: newMembershipFetching,
    isSuccess: newMembershipSuccess,
  } = useGetUserMembership(newUserDetails?.currentStoreId!);

  const {
    mutate: createStoreService,
    isError,
    isLoading: createStoreLoading,
  } = useCreateStoreMutation({
    onSuccess: (data) => {
      if (userDetails?.currentStoreId == null) {
        setNewUserDetails({
          ...userDetails,
          currentStoreId: data.id,
        } as UserResponse)
        queryClient.invalidateQueries({ queryKey: [GET_STORES] });
      } else {
        queryClient.invalidateQueries({ queryKey: [GET_STORES] });
        router.push(Routes.STORES);
      }
    },
    onError: (error) => {
      console.log("Store not created.");
      console.error({ ...error });
    },
  });

  useEffect(() => {
    if (newMembershipSuccess) {
      setUserMembership(newMembershipDetails)
      setUserDetails({
        ...userDetails,
        currentStoreId: newUserDetails?.currentStoreId
      } as UserResponse)
      queryClient.setQueryData([GET_USER], {
        ...userDetails,
        currentStoreId: newUserDetails.id,
      } as UserResponse);
      router.push(Routes.HOME);
    }
  }, [newMembershipDetails])


  return (
    <ScreenContainer withHeader>
      <Stack.Screen
        options={{
          ...stackHeaderStyles(),
          headerShadowVisible: false
        }}
      />
      <KeyboardAwareScroll elementOnTopOfKeyboard={
        <Box paddingTop="4" paddingBottom="6">
          <Button size="lg" onPress={handleCreateStore}
            isLoading={createStoreLoading || newMembershipFetching}
            isLoadingText="CREATING STORE"
          >
            CREATE STORE
          </Button>
        </Box>
      }>
        <Column space="6" height="full" pb="6">
          <HStack py="4">
            <Text fontSize="xl" fontWeight="semibold">
              New Store
            </Text>
          </HStack>
          <HStack justifyContent="center">
            <NewStoreIcon />
          </HStack>
          <HStack flex="1">
            <FormControl
              label="Store name"
              errorMessage={errors.name}
              isInvalid={errors.name !== ""}
            >
              <TextField
                placeholder="Enter store name"
                onFocus={() => handleErrors("", "name")}
                onChangeText={(value) => handleOnchange(value, "name")}
              />
            </FormControl>
          </HStack>
        </Column>
      </KeyboardAwareScroll>
    </ScreenContainer>
  );
};

export default NewStore;
