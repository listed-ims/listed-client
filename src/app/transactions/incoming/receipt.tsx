import {
  Button,
  IncomingReceiptIcon,
  ListedIcon,
} from "@listed-components/atoms";
import { IncomingReceiptDetails } from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { useGetIncomingDetails } from "@listed-hooks";
import { dateToMonthDDYYYY, dateToReadableTime } from "@listed-utils";
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

const IncomingReceipt = () => {
  const { transactionId } = useLocalSearchParams();
  const {
    data: transactionDetails,
    isError: transactionError,
    isFetching: transactionFetching,
  } = useGetIncomingDetails(parseInt(transactionId as string));

  const transactionDate = new Date(
    transactionDetails?.transactionDate.toString()!
  );

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

        <IncomingReceiptDetails incomingDetails={transactionDetails!} />

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
          <Button size="lg" onPress={() => router.back()}>
            Close
          </Button>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default IncomingReceipt;
