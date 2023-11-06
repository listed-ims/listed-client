import { Stack, router } from "expo-router";
import React, { useEffect } from "react";
import {
  MainButtons,
  ProductAlertCard,
  SummaryCard,
  TransactionButton,
} from "@listed-components/molecules";
import { Column, View, Row, Text } from "native-base";
import { ScrollView } from "react-native";
import {
  DashboardNoStore,
  ScreenContainer,
} from "@listed-components/organisms";
import { Routes } from "@listed-constants";
import { useGetAnalyticsSummary, useGetStoreDetails } from "@listed-hooks";
import { useAuth } from "@listed-contexts";
import { MembershipStatus } from "@listed-types";

const Home = () => {
  const { userDetails, userMembership } = useAuth();

  const {
    data: storeDetails,
    isError: storeError,
    isFetching: storeFetching,
  } = useGetStoreDetails(userDetails?.currentStoreId);

  const {
    data: analyticsSummaryDetails,
    isError: analyticsSummaryError,
    isFetching: analyticsSummaryFetching,
  } = useGetAnalyticsSummary(userDetails?.currentStoreId);

  useEffect(() => {
    if (userMembership?.membershipStatus === MembershipStatus.INACTIVE)
      router.replace(Routes.UNAUTHORIZED_INACTIVE);
  }, [userMembership]);

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      {!userDetails?.currentStoreId ||
      userMembership?.membershipStatus === MembershipStatus.PENDING ? (
        <DashboardNoStore storeDetails={storeDetails!} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Column marginTop="6" space="2">
            <Text fontWeight="medium" fontSize="md">
              <Text color="muted.400">Welcome</Text> {userDetails?.username}!
            </Text>
            <SummaryCard
              isFetching={storeFetching || analyticsSummaryFetching}
              storeDetails={storeDetails!}
              analyticsSummaryDetails={analyticsSummaryDetails!}
            />
          </Column>
          <View marginY={4} />
          <Row width="full" space="4">
            <TransactionButton
              flexGrow="1"
              type="incoming"
              onPress={() => {
                router.push(Routes.NEW_INCOMING);
              }}
            />
            <TransactionButton
              flexGrow="1"
              type="outgoing"
              onPress={() => {
                router.push(Routes.NEW_OUTGOING);
              }}
            />
          </Row>
          <View marginY={3} />
          <Column space="2">
            <Text fontWeight="medium" fontSize="sm">
              Inventory Management
            </Text>
            <Row width="full" space="3">
              <MainButtons 
                flex="1" type="analytics"
                onPress={() => {
                  router.push(Routes.ANALYTICS);
                }}
              />
              <MainButtons
                flex="1"
                type="products"
                onPress={() => {
                  router.push(Routes.PRODUCTS);
                }}
              />
              <MainButtons
                flex="1"
                type="collaborators"
                onPress={() => {
                  router.push(Routes.COLLABORATORS);
                }}
              />
              <MainButtons
                flex="1"
                type="transactions"
                onPress={() => {
                  router.push(Routes.TRANSACTIONS);
                }}
              />
            </Row>
          </Column>
          <View marginY={3} />
          <Column space="2">
            <Text fontWeight="medium" fontSize="sm">
              Product Alerts
            </Text>
            <Row width="full" space="4">
              <ProductAlertCard
                isFetching={analyticsSummaryFetching}
                flex="1"
                type="stocks"
                alertDetails={{
                  totalLowStock: analyticsSummaryDetails?.totalLowStock!,
                }}
              />
              <ProductAlertCard
                isFetching={analyticsSummaryFetching}
                flex="1"
                type="expiration"
                alertDetails={{
                  totalNearExpiry: analyticsSummaryDetails?.totalNearExpiry!,
                }}
              />
            </Row>
          </Column>
          <View marginY={3} />
        </ScrollView>
      )}
    </ScreenContainer>
  );
};

export default Home;
