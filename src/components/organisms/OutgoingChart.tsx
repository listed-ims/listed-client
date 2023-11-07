import { AlertOutlineIcon } from "@listed-components/atoms";
import { ChartNavigation, FrequencyFilter } from "@listed-components/molecules";
import { Frequency } from "@listed-constants";
import { convertToNextNearesttHundred, toCurrency } from "@listed-utils";
import { HStack, Text, VStack, useTheme, View } from "native-base";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { itemType as BarItemType } from "react-native-gifted-charts/src/BarChart/types";

interface OutgingChartProps {
  data: BarItemType[];
  filter: Frequency;
  dateRange: string;
  onFilterChange: (filter: Frequency) => void;
  onPageChange: (direction: "next" | "prev") => void;
}

const OutgoingChart = ({
  data,
  filter,
  dateRange,
  onFilterChange,
  onPageChange,
}: OutgingChartProps) => {
  const { colors } = useTheme();
  const [maxValue, setMaxValue] = useState(100);

  useEffect(() => {
    data?.map((i) => {
      const convertedValue = convertToNextNearesttHundred(i.value);
      convertedValue > maxValue ? setMaxValue(convertedValue) : null;
    });
  }, [data]);

  return (
    <VStack space="1">
      <Text fontSize="lg" fontWeight="semibold" color="text.500">
        Outgoing Products (not sales)
      </Text>
      <VStack space="2">
        <HStack alignItems="center" space="2">
          <VStack>
            <Text fontSize="2xs" fontWeight="medium" color="text.500">
              Total Products Value
            </Text>
            <Text fontSize="md" fontWeight="semibold" color="darkText">
              {toCurrency(
                data
                  ? data.reduce((accumulator, i) => {
                      return accumulator + i.value;
                    }, 0)
                  : 0
              )}
            </Text>
          </VStack>
          <HStack flex="1" alignItems="center" space="1">
            <AlertOutlineIcon color={colors.gray[500]} />
            <Text fontSize="2xs" color="text.500">
              This is the total purchase price of the products not sold.
            </Text>
          </HStack>
        </HStack>

        <VStack
          space="1"
          borderRadius="lg"
          bgColor="offWhite.200"
          py="4"
          alignItems="center"
        >
          <ChartNavigation
            title={`${filter} Outgoing`}
            subtitle={dateRange}
            onPrev={() => onPageChange("prev")}
            onNext={() => onPageChange("next")}
          />
          <HStack w="full" justifyContent="center" alignItems="center">
            <VStack alignItems="center">
              <View ml="2">
                <BarChart
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
                  barBorderTopRightRadius={4}
                  barBorderTopLeftRadius={4}
                  barWidth={24}
                  barMarginBottom={4}
                  spacing={38}
                />
              </View>
              <Text fontSize="2xs" fontWeight="medium" color="text.500">
                OUTGOING CATEGORY
              </Text>
            </VStack>
          </HStack>
          <HStack mt="2">
            <FrequencyFilter filter={filter} onFilterChange={onFilterChange} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default OutgoingChart;
