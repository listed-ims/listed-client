import React from "react";
import {
  AlertOutlineIcon,
  BackIcon,
  Button,
  ScreenContainer,
  StoreDetailsIcon,
  StoreDetailsInviteIcon,
} from "@listed-components";
import { Stack, router } from "expo-router";
import {
  Badge,
  Column,
  Heading,
  VStack,
  Text,
  HStack,
  Divider,
  ScrollView,
} from "native-base";
import {  useTheme } from "native-base"

const StoreDetails = () => {
  const theme = useTheme();

  return (
    <ScreenContainer withHeader>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShown: true,
          title: "",
          headerShadowVisible: true,
          headerLeft: () => (
            <HStack space="4" alignItems="center">
              <BackIcon onPress={() => router.back()} />
              <Text fontSize="sm" fontWeight="semibold">
                Store Details
              </Text>
            </HStack>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column space="4" height="full" py="6">
          <VStack space="1" alignItems="center">
            <StoreDetailsIcon />
            <Heading size="md">7/Evelen</Heading>
            <Badge colorScheme="success" variant="solid">
              CURRENT STORE
            </Badge>
            <Text fontSize="xs" fontWeight="medium" color="darkText">
              Jem, you are a collaborator!
            </Text>
          </VStack>

          <VStack
            alignItems="center"
            space="1"
            p="4"
            bgColor="primary.700"
            borderRadius="8"
            borderColor="primary.700"
            borderWidth="1"
          >
            <HStack space="1">
              <StoreDetailsInviteIcon />
              <Text fontSize="sm" fontWeight="semibold" color="white">
                You got an invite.
              </Text>
            </HStack>
            <Text fontSize="xs" color="white">
              Abigail invited you to join this store.
            </Text>
            <HStack space="4" pt="4">
              <Button flex="1" variant="white">
                ACCEPT
              </Button>
              <Button flex="1" variant="whiteOutline">
                DECLINE
              </Button>
            </HStack>
          </VStack>

          <VStack
            space="4"
            borderWidth="1"
            borderRadius="lg"
            borderColor="muted.300"
            p="4"
          >
            <VStack space="2">
              <Text fontSize="xs" fontWeight="semibold" color="muted.500">
                STORE DETAILS
              </Text>
              <VStack space="1">
                <HStack>
                  <Text flex="2" fontSize="sm" color="darkText">
                    Store Owner:
                  </Text>
                  <Text
                    flex="3"
                    fontSize="sm"
                    fontWeight="bold"
                    color="darkText"
                  >
                    Abigail
                  </Text>
                </HStack>
                <HStack>
                  <Text flex="2" fontSize="sm" color="darkText">
                    Store Status:
                  </Text>
                  <Text
                    flex="3"
                    fontSize="sm"
                    fontWeight="bold"
                    color="darkText"
                  >
                    Open
                  </Text>
                </HStack>
              </VStack>
            </VStack>
            <Divider />
            <VStack space="2">
              <Text fontSize="xs" fontWeight="semibold" color="muted.500">
                STORE PRODUCTS
              </Text>
              <VStack space="1">
                <HStack>
                  <Text flex="2" fontSize="sm" color="darkText">
                    Total Products:
                  </Text>
                  <Text
                    flex="3"
                    fontSize="sm"
                    fontWeight="bold"
                    color="darkText"
                  >
                    10000
                  </Text>
                </HStack>
                <HStack>
                  <Text flex="2" fontSize="sm" color="darkText">
                    Total Price Value:
                  </Text>
                  <Text
                    flex="3"
                    fontSize="sm"
                    fontWeight="bold"
                    color="darkText"
                  >
                    Php 240,080.00
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </VStack>

          <VStack
            space="2"
            borderWidth="1"
            borderRadius="lg"
            borderColor="primary.300"
            p="4"
          >
            <Text fontSize="xs" fontWeight="semibold" color="muted.500">
              MAKE CURRENT STORE
            </Text>
            <Text fontSize="sm" color="darkText">
              Make this store your current store to manage.
            </Text>
            <Button>MAKE CURRENT STORE</Button>
          </VStack>

          <VStack
            space="2"
            borderWidth="1"
            borderRadius="lg"
            borderColor="error.300"
            p="4"
          >
            <HStack space="1">
              <AlertOutlineIcon color={theme.colors.error[500]}/>
              <Text fontSize="xs" fontWeight="semibold" color="error.500">
                CLOSE STORE
              </Text>
            </HStack>
            <Text fontSize="sm" color="darkText">
              Closing a store will disable all features for inventory
              management. This will make the store read-only. Closed stores
              cannot be reopened.
            </Text>
            <Button variant="warnSubtle"> CLOSE STORE </Button>
          </VStack>
        </Column>
      </ScrollView>
    </ScreenContainer>
  );
};

export default StoreDetails;
