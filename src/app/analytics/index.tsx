import {
  BestsellingChart,
  OutgoingChart,
  RevenueChart,
  ScreenContainer,
} from "@listed-components/organisms";
import { Frequency } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import {
  useGetAnalyticsOutgoingValue,
  useGetAnalyticsRevenue,
  useGetAnalyticsTopProducts,
} from "@listed-hooks";
import { stackHeaderStyles } from "@listed-styles";
import { Stack } from "expo-router";
import { ScrollView, VStack, useTheme, Text } from "native-base";
import { useEffect, useState } from "react";
import { itemType as LineItemType } from "react-native-gifted-charts/src/LineChart/types";
import { itemType as BarItemType } from "react-native-gifted-charts/src/BarChart/types";
import { dateToDay, toTitleCase, truncate } from "@listed-utils";

const Analytics = () => {
  const { userDetails } = useAuth();
  const { colors } = useTheme();
  const [revenueFilter, setRevenueFilter] = useState(Frequency.WEEKLY);
  const [topProductsFilter, setTopProductsFilter] = useState(Frequency.WEEKLY);
  const [outgoingValueFilter, setOutgoingValueFilter] = useState(
    Frequency.WEEKLY
  );
  const [revenuePage, setRevenuePage] = useState(1);
  const [topProductsPage, setTopProductsPage] = useState(1);
  const [outgoingValuePage, setOutgoingValuePage] = useState(1);

  const {
    data: revenues,
    isError: revenuesError,
    isFetching: revenuesFetching,
  } = useGetAnalyticsRevenue(
    userDetails?.currentStoreId!,
    revenueFilter,
    revenuePage,
    6
  );

  const {
    data: topProducts,
    isError: topProductsError,
    isFetching: topProductsFetching,
  } = useGetAnalyticsTopProducts(
    userDetails?.currentStoreId!,
    topProductsFilter,
    topProductsPage,
    1
  );

  const {
    data: outgoingValue,
    isError: outgoingValuesError,
    isFetching: outgoingValuesFetching,
  } = useGetAnalyticsOutgoingValue(
    userDetails?.currentStoreId!,
    outgoingValueFilter,
    outgoingValuePage,
    1
  );

  const revenueChartData = revenues
    ?.map((revenue) => {
      return {
        value: revenue.revenue,
        label: `${revenue.startDate.toString().slice(-2)}-${revenue.endDate
          .toString()
          .slice(-2)}`,
      } as LineItemType;
    })
    .reverse();

  const bestsellingChartData = topProducts
    ? topProducts[0].products
    : undefined;

  const outgoingChartData = outgoingValue
    ? outgoingValue[0].categories.map((category, index) => {
        return {
          value: category.value,
          label: toTitleCase(category.category),
          frontColor:
            index % 2 !== 0 ? colors.primary[300] : colors.primary[700],
        } as BarItemType;
      })
    : undefined;

  const handleOnFilterChange = (
    chart: "revenue" | "products" | "outgoing",
    filter: Frequency
  ) => {
    if (chart === "revenue") {
      setRevenueFilter(filter);
      setRevenuePage(1);
    } else if (chart === "products") {
      setTopProductsFilter(filter);
      setTopProductsPage(1);
    } else if (chart === "outgoing") {
      setOutgoingValueFilter(filter);
      setOutgoingValuePage(1);
    }
  };

  const handleOnPageChange = (
    chart: "revenue" | "products" | "outgoing",
    direction: "prev" | "next"
  ) => {
    if (chart === "revenue" && revenues) {
      if (direction === "next" && revenuePage > 1)
        setRevenuePage(revenuePage - 1);
      else if (direction === "prev" && revenuePage < revenues[0].totalPages)
        setRevenuePage(revenuePage + 1);
    } else if (chart === "products" && topProducts) {
      if (direction === "next" && topProductsPage > 1)
        setTopProductsPage(topProductsPage - 1);
      else if (
        direction === "prev" &&
        topProductsPage < topProducts[0].totalPages
      )
        setTopProductsPage(topProductsPage + 1);
    } else if (chart === "outgoing" && outgoingValue) {
      if (direction === "next" && outgoingValuePage > 1)
        setOutgoingValuePage(outgoingValuePage - 1);
      else if (
        direction === "prev" &&
        outgoingValuePage < outgoingValue[0].totalPages
      )
        setOutgoingValuePage(outgoingValuePage + 1);
    }
  };

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Analytics")} />
      {revenuesFetching && topProductsFetching && outgoingChartData ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack height="full" space="6" paddingTop="6" paddingBottom="8">
            <BestsellingChart
              data={bestsellingChartData!}
              filter={topProductsFilter}
              onFilterChange={(filter: Frequency) =>
                handleOnFilterChange("products", filter)
              }
              onPageChange={(direction: "next" | "prev") =>
                handleOnPageChange("products", direction)
              }
              dateRange={
                topProducts
                  ? `${dateToDay(
                      new Date(topProducts[0].startDate.toString())
                    )} - ${dateToDay(
                      new Date(topProducts[0].endDate.toString())
                    )}`
                  : ""
              }
            />
            <RevenueChart
              data={revenueChartData!}
              filter={revenueFilter}
              onFilterChange={(filter: Frequency) =>
                handleOnFilterChange("revenue", filter)
              }
              onPageChange={(direction: "next" | "prev") =>
                handleOnPageChange("revenue", direction)
              }
              dateRange={
                revenues
                  ? revenues?.length! > 1
                    ? `${dateToDay(
                        new Date(
                          revenues[revenues.length - 1].startDate.toString()
                        )
                      )} - ${dateToDay(
                        new Date(revenues[0].endDate.toString())
                      )}`
                    : `${dateToDay(
                        new Date(revenues[0].startDate.toString())
                      )} - ${dateToDay(
                        new Date(revenues[0].endDate.toString())
                      )}`
                  : ""
              }
            />
            <OutgoingChart
              data={outgoingChartData!}
              filter={outgoingValueFilter}
              onFilterChange={(filter: Frequency) =>
                handleOnFilterChange("outgoing", filter)
              }
              onPageChange={(direction: "next" | "prev") =>
                handleOnPageChange("outgoing", direction)
              }
              dateRange={
                outgoingValue
                  ? `${dateToDay(
                      new Date(outgoingValue[0].startDate.toString())
                    )} - ${dateToDay(
                      new Date(outgoingValue[0].endDate.toString())
                    )}`
                  : ""
              }
            />
          </VStack>
        </ScrollView>
      )}
    </ScreenContainer>
  );
};

export default Analytics;
