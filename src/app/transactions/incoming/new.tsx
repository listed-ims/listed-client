import React, { useState } from "react";
import {
  Button,
  ScanIcon,
  SearchIcon
} from "@listed-components/atoms";
import { FormControl, TextArea, TextField } from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { Stack, router } from "expo-router";
import { Text, HStack, Column, View, Box, useTheme } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import { Routes } from "@listed-constants";
import { stackHeaderStyles } from "@listed-styles";
import { dateToMMDDYY } from "@listed-utils";

const NewIncoming = () => {
  const { colors } = useTheme();
  const [expirationDate, setExpirationDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined
  ) => {
    const selectedDate = date;
    setShowDatePicker(false);
    setDate(selectedDate!);

    if (selectedDate instanceof Date) {
      const formattedDate = dateToMMDDYY(selectedDate);
      setExpirationDate(formattedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
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
              <Pressable style={{ flex: 1 }} onPress={() => {
                router.push(Routes.SELECT_PRODUCT)
              }}>
                <TextField
                  isReadOnly
                  flex="1"
                  placeholder="Search a product"
                  rightElement={
                    <View marginX="3">
                      <SearchIcon />
                    </View>
                  }
                />
              </Pressable>
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
            <Pressable onPress={showDatepicker} style={{ flex: 1 }}>
              <TextField
                isReadOnly
                flex="1"
                placeholder="Enter date (mm/dd/yyyy)"
                value={expirationDate}
              />
            </Pressable>
            {showDatePicker && (
              <RNDateTimePicker
                accentColor={colors.primary[700]}
                value={date}
                mode="date"
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
