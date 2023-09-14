import React, { useState } from "react";
import {
  Button,
  ScanIcon,
  SearchIcon
} from "@listed-components/atoms";
import { FormControl, TextArea, TextField } from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { Stack, router } from "expo-router";
import { Text, HStack, Column, View, Box } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import { Routes } from "@listed-constants";
import { stackHeaderStyles } from "@listed-styles";

const NewIncoming = () => {
  const [expirationDate, setExpirationDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    if (currentDate instanceof Date) {
      const formattedDate = formatDate(currentDate);
      setExpirationDate(formattedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Incoming")} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Column>
          <HStack py="4">
            <Text fontSize="18px" fontWeight="semibold">
              Enter Transaction Details
            </Text>
          </HStack>

          <FormControl label="Product">
            <HStack space="2">
              <TextField
                flex="1"
                
                placeholder="Search a product"
                onPressIn={()=>{
                  router.push(Routes.SELECT_PRODUCT)
                }}
                rightElement={
                  <View marginX="3">
                    <SearchIcon />
                  </View>
                }
              />
              <Button fontSize="sm" startIcon={<ScanIcon />}>
                Scan
              </Button>
            </HStack>
          </FormControl>

          <FormControl
            fontSize="12px"
            label={
              <>
                <Text fontWeight="medium" fontSize="sm">
                  Expiration Date
                </Text>
                <Text fontWeight="medium" fontSize="sm" color="text.500">
                  {" "}
                  (optional)
                </Text>
              </>
            }
          >
            <HStack>
              <Pressable onPress={showDatepicker} style={{ flex: 1 }}>
                <TextField
                  isReadOnly
                  flex="1"
                  placeholder="Enter date (mm/dd/yyyy)"
                  value={expirationDate}
                />
              </Pressable>
            </HStack>
            {show && (
              <RNDateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </FormControl>
          <FormControl label="Quantity">
            <TextField placeholder="Enter product quantity" />
          </FormControl>

          <FormControl label="Purchase Price / Item">
            <TextField placeholder="Enter purchase price per item" />
          </FormControl>

          <HStack>
            <FormControl
              label={
                <>
                  <Text fontWeight="medium" fontSize="sm">
                    Comment
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="text.500">
                    {" "}
                    (optional)
                  </Text>
                </>
              }
            >
              <TextArea placeholder="Enter comment here" />
            </FormControl>
          </HStack>
        </Column>
      </KeyboardAwareScrollView>
      <Box background="white" paddingTop="4" paddingBottom="6">
        <Button size="lg">SUBMIT TRANSACTION</Button>
      </Box>
    </ScreenContainer>
  );
};

export default NewIncoming;
