import { DataSummaryIcon, StoreNameIcon } from "@listed-components/atoms";
import { StoreResponse, SummaryResponse } from "@listed-types";
import { toCurrency } from "@listed-utils";
import { Box, Column, Divider, Row, Skeleton, Text, View } from "native-base";
import React from "react";

interface SummaryCardProps {
  storeDetails: StoreResponse;
  analyticsSummaryDetails: SummaryResponse;
  isFetching: boolean;
}

const SummaryCard = ({
  storeDetails,
  analyticsSummaryDetails,
  isFetching,
}: SummaryCardProps) => {
  return (
    <Column
      alignItems="center"
      space="4"
      p="6"
      borderRadius="lg"
      background="primary.700"
    >
      <Row width="full" alignItems="center" space="4">
        <StoreNameIcon />
        <Column>
        <Text color="lightText" fontSize="sm" fontWeight="medium">
          Store Name
        </Text>
        {isFetching ? (
          <Skeleton rounded="lg" h="6" width="60%" startColor="primary.500" />
        ) : (
          <Text color="lightText" fontSize="lg" fontWeight="bold">
            {storeDetails?.name}
          </Text>
        )}
        </Column>
      </Row>
      <Divider my="1" />
      <Row width="full" justifyContent="space-between" alignItems="center">
        <Column space="2" alignItems="flex-start">
          <Box bgColor="offWhite.700" p="1" borderRadius="4">
            <Text color="primary.700" fontSize="xs" fontWeight="medium">
              TODAY
            </Text>
          </Box>
          <View>
            <Text color="lightText" fontSize="sm" fontWeight="medium">
              Total Revenue
            </Text>

            {isFetching ? (
              <Skeleton
                rounded="lg"
                h="5"
                width="100%"
                startColor="primary.500"
              />
            ) : (
              <Text color="lightText" fontSize="xl" fontWeight="bold">
                {toCurrency(analyticsSummaryDetails?.totalDailyRevenue)}
              </Text>
            )}
          </View>
        </Column>
        <DataSummaryIcon />
      </Row>
    </Column>
  );
};

export default SummaryCard;
