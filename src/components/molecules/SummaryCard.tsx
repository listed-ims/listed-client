import {
  DataSummaryIcon,
  StoreNameIcon,
} from "@listed-components/atoms";
import { StoreResponse, SummaryResponse } from "@listed-types";
import { toCurrency } from "@listed-utils";
import { Column, Row, Text, View } from "native-base";
import React from "react";

interface SummaryCardProps {
  storeDetails: StoreResponse;
  analyticsSummaryDetails: SummaryResponse;
}

const SummaryCard = ({
  storeDetails,
  analyticsSummaryDetails,
}: SummaryCardProps) => {
  return (
    <Column
      alignItems="center"
      space="4"
      px="4"
      py="6"
      borderRadius="lg"
      background="primary.700"
    >
      <Row width="full" alignItems="center" justifyContent="space-between">
        <Row alignItems="center" space="2">
          <StoreNameIcon />
          <Text color="lightText" fontSize="xl" fontWeight="bold">
            {storeDetails?.name}
          </Text>
        </Row>
        <Text color="lightText" fontSize="sm" fontWeight="regular">
          Today
        </Text>
      </Row>
      <Row
        width="full"
        paddingX="4"
        justifyContent="space-between"
        alignItems="center"
      >
        <Column space="2">
          <View>
            <Text color="lightText" fontSize="sm" fontWeight="medium">
              Total Revenue
            </Text>
            <Text color="lightText" fontSize="lg" fontWeight="bold">
              {toCurrency(analyticsSummaryDetails?.totalDailyRevenue)}
            </Text>
          </View>
          <View>
            <Text color="lightText" fontSize="sm" fontWeight="medium">
              Total Items Sold
            </Text>
            <Text color="lightText" fontSize="lg" fontWeight="bold">
              {`${analyticsSummaryDetails?.totalDailyItemsSold} products`}
            </Text>
          </View>
        </Column>
        <DataSummaryIcon />
      </Row>
    </Column>
  );
};

export default SummaryCard;
