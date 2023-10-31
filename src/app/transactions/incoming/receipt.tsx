import {
  Button,
  IncomingReceiptIcon,
  ListedIcon,
} from "@listed-components/atoms";
import { IncomingReceiptDetails, IncomingReceiptLoadingSkeleton } from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useGetIncomingDetails } from "@listed-hooks";
import { UserPermission } from "@listed-types";
import { dateToMonthDDYYYY, dateToReadableTime, hasPermission } from "@listed-utils";
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

const IncomingReceipt = () => {
  const { transactionId } = useLocalSearchParams();
  const { userMembership } = useAuth();

  useEffect(() => {
    if (!hasPermission(
      userMembership!,
      UserPermission.GET_INCOMING_DETAILS
    ))
      router.replace(Routes.UNAUTHORIZED)
  }, [userMembership])

  const {
    data: transactionDetails,
    isError: transactionError,
    isFetching: transactionFetching,
  } = useGetIncomingDetails(parseInt(transactionId as string));

  const transactionDate = new Date(
    transactionDetails?.transactionDate.toString()!
  );

  const userPermissions = userMembership?.permissions || [];

  if(transactionFetching){
    return <IncomingReceiptLoadingSkeleton />
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingTop="8" paddingBottom="6">
          <Text fontSize="sm" fontWeight="medium" textAlign="center">
            Transaction Receipt
          </Text>
        </Box>
        <Box alignItems="center">
          <VStack alignItems="center">
            <IncomingReceiptIcon />
            <Heading fontSize="md" fontWeight="bold" paddingTop="1">
              Incoming
            </Heading>
            <Text fontSize="xs" fontWeight="medium" paddingTop="1">
              {dateToMonthDDYYYY(transactionDate) +
                " - " +
                dateToReadableTime(transactionDate)}
            </Text>
          </VStack>
        </Box>

        <IncomingReceiptDetails incomingDetails={transactionDetails!} userPermissions={userPermissions!} />

        <HStack paddingTop="4" alignItems="center">
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
        <Box background="white" marginTop="6" marginBottom="6">
          <Button size="lg" onPress={() => router.push(Routes.NEW_INCOMING)}>
            CLOSE
          </Button>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default IncomingReceipt;
