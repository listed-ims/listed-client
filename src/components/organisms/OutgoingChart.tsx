import { AlertOutlineIcon } from "@listed-components/atoms";
import { ChartNavigation, FrequencyFilter } from "@listed-components/molecules";
import { Frequency } from "@listed-constants";
import { HStack, Text, VStack, useTheme } from "native-base";
import React, { useState } from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const mock_data = [
  { value: 50, label: "Defects" },
  { value: 30, label: "Expired" },
  { value: 45, label: "Lost" },
  { value: 26, label: "Consumed" },
];

const OutgoingChart = () => {
  const { colors } = useTheme();
  const [filter, setFilter] = useState(Frequency.WEEKLY);

  const handleSetFilter = (filter: Frequency) => {
    setFilter(filter);
  };

  const data = mock_data.map((product, index) => {
    return {
      ...product,
      frontColor: index % 2 !== 0 ? colors.primary[300] : colors.primary[700],
    };
  });

  return (
    <VStack space="1">
      <Text fontSize="lg" fontWeight="semibold" color="text.500">
        Outgoing Products (not sales)
      </Text>
      <VStack space="2">
        <HStack alignItems="center" space="4">
          <VStack>
            <Text fontSize="2xs" fontWeight="medium" color="text.500">
              Top Product Value
            </Text>
            <Text fontSize="md" fontWeight="semibold" color="darkText">
              Php 1000.00
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
            title="Monthly Ougoing"
            subtitle="Sept 4 - Today"
            onPrev={() => {}}
            onNext={() => {}}
          />
          <View>
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
              noOfSections={6}
              stepValue={10}
              maxValue={6 * 10}
              barBorderTopRightRadius={4}
              barBorderTopLeftRadius={4}
              barWidth={24}
              barMarginBottom={4}
              spacing={38}
            />
          </View>
          <HStack mt="2">
            <FrequencyFilter filter={filter} onFilter={handleSetFilter} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default OutgoingChart;
