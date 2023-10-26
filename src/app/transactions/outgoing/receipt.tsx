import {
  Button,
  ListedIcon,
  OutgoingReceiptIcon,
} from "@listed-components/atoms";
import { OutgoingReceiptDetails } from "@listed-components/molecules";
import {
  ScreenContainer,
} from "@listed-components/organisms";
import { useAuth } from "@listed-contexts";
import { Routes } from "@listed-constants";
import { useGetOutgoingDetails } from "@listed-hooks";
import { UserPermission } from "@listed-types";
import {
  dateToMonthDDYYYY,
  dateToReadableTime,
  toTitleCase,
  hasPermission,
} from "@listed-utils";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Box,
  Divider,
  HStack,
  Heading,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { useEffect } from "react";

const OutgoingReceipt = () => {
  const { transactionId } = useLocalSearchParams();
  const { userMembership } = useAuth();

  useEffect(() => {
    if (!hasPermission(
      userMembership!,
      UserPermission.GET_OUTGOING_DETAILS
    ))
      router.replace(Routes.UNAUTHORIZED)
  }, [userMembership])

  const {
    data: transactionDetails,
    isError: transactionError,
    isFetching: transactionFetching,
  } = useGetOutgoingDetails(parseInt(transactionId as string));

  const transactionDate = new Date(
    transactionDetails?.transactionDate.toString()!
  );

  const userPermission = userMembership?.permissions || [];

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box pt="8" pb="6">
          <Text fontSize="sm" fontWeight="medium" textAlign="center">
            Transaction Receipt
          </Text>
        </Box>
        <Box alignItems="center">
          <VStack alignItems="center">
            <OutgoingReceiptIcon />
            <Heading fontSize="md" fontWeight="bold" pt="1">
              Outgoing - {toTitleCase(String(transactionDetails?.category))}
            </Heading>
            <Text fontSize="xs" fontWeight="medium" pt="1">
              {dateToMonthDDYYYY(transactionDate) +
                " - " +
                dateToReadableTime(transactionDate)}
            </Text>
          </VStack>
        </Box>

        <OutgoingReceiptDetails
          outgoingDetails={transactionDetails!}
          userPermissions={userPermission!}
        />

        <HStack pt="4" alignItems="center">
          <Spacer>
            <Divider />
          </Spacer>
          <Box px="4">
            <ListedIcon />
          </Box>
          <Spacer>
            <Divider />
          </Spacer>
        </HStack>

        <Box alignItems="center" justifyContent="center">
          <Text textAlign="center" fontSize="xs" fontWeight="medium">
            Thank you for using
            <Text color="primary.700"> listed.</Text>
          </Text>
        </Box>
        <Box background="white" mt="6" mb="6">
          <Button size="lg" onPress={() => router.push(Routes.NEW_OUTGOING)}>
            CLOSE
          </Button>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default OutgoingReceipt;
