import {
  Button,
  IncomingReceiptIcon,
  ListedIcon,
} from "@listed-components/atoms";
import IncomingReceiptCard from "@listed-components/molecules/IncomingReceiptCard";
import {
  KeyboardAwareScroll,
  ScreenContainer,
} from "@listed-components/organisms";
import { Stack, router } from "expo-router";
import {
  Box,
  Divider,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "native-base";

const IncomingReceipt = () => {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAwareScroll>
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
              Jan 1, 2023 - 8:00AM
            </Text>
          </VStack>
        </Box>
        <IncomingReceiptCard
          referenceNumber={1001}
          name="Coca Cola"
          variant="100ml"
          expirationDate="Jan 1, 2024"
          purchasePrice={20.0}
          totalQuantity={80}
          totalPurchasePrice={160.0}
          performedBy="Jeon Somi"
          comment="I Love Somi"
          userRole="owner"
        />
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
      </KeyboardAwareScroll>
    </ScreenContainer>
  );
};

export default IncomingReceipt;
