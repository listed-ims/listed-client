import {
  BestsellingChart,
  OutgoingChart,
  RevenueChart,
  ScreenContainer,
} from "@listed-components/organisms";
import { stackHeaderStyles } from "@listed-styles";
import { Stack } from "expo-router";
import { ScrollView, VStack } from "native-base";
import React from "react";

const Analytics = () => {
  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Analytics")} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack height="full" space="6" paddingTop="6" paddingBottom="8">
          <RevenueChart />
          <BestsellingChart />
          <OutgoingChart />
        </VStack>
      </ScrollView>
    </ScreenContainer>
  );
};

export default Analytics;
