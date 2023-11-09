import {
  BestsellingChart,
  OutgoingChart,
  RevenueChart,
  ScreenContainer,
} from "@listed-components/organisms";
import { Frequency } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { stackHeaderStyles } from "@listed-styles";
import { Stack } from "expo-router";
import { ScrollView, VStack, useTheme, Text } from "native-base";
import { useState } from "react";
import { itemType as LineItemType } from "react-native-gifted-charts/src/LineChart/types";
import { itemType as BarItemType } from "react-native-gifted-charts/src/BarChart/types";
import { dateToDay, toTitleCase } from "@listed-utils";
import { ProductSalesResponse, TopProductResponse } from "@listed-types";

const revenues = [
  {
    startDate: "2023-11-05",
    endDate: "2023-11-11",
    revenue: 3500,
    totalPages: 2
  },
  {
    startDate: "2023-10-29",
    endDate: "2023-11-04",
    revenue: 5500,
    totalPages: 2
  },
  {
    startDate: "2023-10-22",
    endDate: "2023-10-28",
    revenue: 1500,
    totalPages: 2
  },
  {
    startDate: "2023-10-15",
    endDate: "2023-10-21",
    revenue: 4000,
    totalPages: 2
  },
  {
    startDate: "2023-10-08",
    endDate: "2023-10-14",
    revenue: 2500,
    totalPages: 2
  },
  {
    startDate: "2023-10-01",
    endDate: "2023-10-07",
    revenue: 3000,
    totalPages: 2
  } 
]

const topProducts = [
  {
    startDate: new Date("2023-11-05"),
    endDate: new Date("2023-11-11"),
    products: [
      {
        product: {
          id: 4,
          name: "Dr. Pepper",
          barcode: "",
          variant: "355 ml",
          salePrice: 25,
          threshold: 8,
          unit: "PCS"
        },
        totalSales: 15,
        totalUnitSold: 3
      },
      {
        product: {
          id: 14,
          name: "Minute Maid Apple Juice",
          barcode: "",
          variant: "450 ml",
          salePrice: 28,
          threshold: 10,
          unit: "PCS"
        },
        totalSales: 12,
        totalUnitSold: 4
      },
      {
        product: {
          id: 10,
          name: "Tropicana Orange Juice",
          barcode: "",
          variant: "1 liter",
          salePrice: 35,
          threshold: 5,
          unit: "PCS"
        },
        totalSales: 10,
        totalUnitSold: 2
      },
      {
        product: {
          id: 13,
          name: "Lipton Iced Tea",
          barcode: "",
          variant: "500 ml",
          salePrice: 20,
          threshold: 15,
          unit: "PCS"
        },
        totalSales: 10,
        totalUnitSold: 5
      },
      {
        product: {
          id: 11,
          name: "Aquafina Water",
          barcode: "",
          variant: "1 liter",
          salePrice: 45,
          threshold: 10,
          unit: "PCS"
        },
        totalSales: 10,
        totalUnitSold: 1
      },
      {
        product: {
          id: 2,
          name: "Pepsi",
          barcode: "",
          variant: "500 ml",
          salePrice: 23,
          threshold: 15,
          unit: "PCS"
        },
        totalSales: 9,
        totalUnitSold: 3
      },
      {
        product: {
          id: 16,
          name: "Mountain Dew",
          barcode: "",
          variant: "330 ml",
          salePrice: 30,
          threshold: 12,
          unit: "PCS"
        },
        totalSales: 5,
        totalUnitSold: 1
      },
      {
        product: {
          id: 6,
          name: "Fanta",
          barcode: "",
          variant: "500 ml",
          salePrice: 20,
          threshold: 15,
          unit: "PCS"
        },
        totalSales: 5,
        totalUnitSold: 1
      },
      {
        product: {
          id: 15,
          name: "7UP",
          barcode: "",
          variant: "330 ml",
          salePrice: 20,
          threshold: 5,
          unit: "PCS"
        },
        totalSales: 5,
        totalUnitSold: 1
      },
      {
        product: {
          id: 3,
          name: "Sprite",
          barcode: "",
          variant: "330 ml",
          salePrice: 18,
          threshold: 20,
          unit: "PCS"
        },
        totalSales: 3,
        totalUnitSold: 1
      }
    ] as ProductSalesResponse[],
    totalPages: 8
  }
] as TopProductResponse[];

const outgoingValue = [
  {
    startDate: "2023-11-05",
    endDate: "2023-11-11",
    categories: [
      {
        category: "CONSUMED",
        value: 15
      },
      {
        category: "DEFECTS",
        value: 10
      },
      {
        category: "EXPIRED",
        value: 25
      },
      {
        category: "LOST",
        value: 5
      }
    ],
    totalPages: 8
  }
];

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
      {false ? (
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
