import { TrendingDownIcon, TrendingUpIcon } from "@listed-components/atoms";
import { ChartNavigation, FrequencyFilter } from "@listed-components/molecules";
import { Frequency } from "@listed-constants";
import { convertToNextNearesttHundred, toCurrency } from "@listed-utils";
import { Box, HStack, Text, VStack, useTheme, View } from "native-base";
import { useEffect, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import { itemType as LineItemType } from "react-native-gifted-charts/src/LineChart/types";

interface RevenueChartProps {
  data: LineItemType[];
  filter: Frequency;
  dateRange: string;
  onFilterChange: (filter: Frequency) => void;
  onPageChange: (direction: "next" | "prev") => void;
}

const RevenueChart = ({
  data,
  filter,
  dateRange,
  onFilterChange,
  onPageChange,
}: RevenueChartProps) => {
  const { colors } = useTheme();
  const [maxValue, setMaxValue] = useState(100);

  useEffect(() => {
    data?.map((i) => {
      const convertedValue = convertToNextNearesttHundred(i.value);
      convertedValue > maxValue ? setMaxValue(convertedValue) : null;
    });
  }, [data]);

  const increased =
    data &&
    data.length > 1 &&
    data[data.length - 1].value > data[data.length - 2].value;

  return (
    <VStack space="1">
      <Text fontSize="lg" fontWeight="semibold" color="text.500">
        Gross Profit
      </Text>
      <VStack space="2">
        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center" space="2">
            <VStack>
              <Text fontSize="2xs" fontWeight="medium" color="text.500">
                This week
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="darkText">
                {toCurrency(data ? data[data.length - 1].value : 0)}
              </Text>
            </VStack>
            <Box
              borderRadius="md"
              bgColor={increased ? "success.50" : "error.50"}
              p="1"
              justifyContent="center"
              alignItems="center"
              h="auto"
              w="auto"
            >
              {increased ? <TrendingUpIcon /> : <TrendingDownIcon />}
            </Box>
          </HStack>
          <Text fontSize="xs" fontWeight="medium" color="text.500">
            <Text color={increased ? "primary.700" : "error.500"}>
              {`${increased ? "+" : "-"} ${toCurrency(
                data && data.length > 1
                  ? Math.abs(
                      data[data.length - 1].value - data[data.length - 2].value
                    )
                  : 0
              )}`}{" "}
            </Text>
            {`from last ${filter === Frequency.MONTHLY ? "month" : "week"}`}
          </Text>
        </HStack>
        <VStack
          space="1"
          borderRadius="lg"
          bgColor="offWhite.200"
          py="4"
          alignItems="center"
          justifyContent="center"
        >
          <ChartNavigation
            title={`${filter} Profit`}
            subtitle={dateRange}
            onPrev={() => onPageChange("prev")}
            onNext={() => onPageChange("next")}
          />
          <VStack alignItems="center">
            <View>
              <LineChart
                data={data}
                hideOrigin
                rulesColor={colors.primary[500]}
                yAxisColor={colors.primary[700]}
                xAxisColor={colors.primary[700]}
                xAxisLabelTextStyle={{
                  color: colors.text[500],
                  fontSize: 10,
                  fontWeight: 500,
                }}
                yAxisTextStyle={{
                  color: colors.text[500],
                  fontSize: 10,
                  fontWeight: 500,
                }}
                dashWidth={1}
                dashGap={8}
                noOfSections={5}
                stepValue={maxValue / 5}
                stepHeight={23}
                maxValue={maxValue}
                overflowBottom={100}
              />
            </View>
            <Text fontSize="2xs" fontWeight="medium" color="text.500" mt="1">
              DATE RANGE
            </Text>
          </VStack>
          <HStack mt="2">
            <FrequencyFilter filter={filter} onFilterChange={onFilterChange} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default RevenueChart;
