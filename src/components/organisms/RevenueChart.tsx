import { TrendingDownIcon } from "@listed-components/atoms";
import { ChartNavigation, FrequencyFilter } from "@listed-components/molecules";
import { Frequency } from "@listed-constants";
import { Box, HStack, Text, VStack, useTheme } from "native-base";
import { useState } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const mock_data = [
  { value: 15, label: "24-30" },
  { value: 30, label: "1-7" },
  { value: 23, label: "8-14" },
  { value: 40, label: "15-21" },
  { value: 16, label: "22-28" },
  { value: 40, label: "29-4" },
];

const RevenueChart = () => {
  const { colors } = useTheme();
  const [filter, setFilter] = useState(Frequency.WEEKLY);

  const handleSetFilter = (filter: Frequency) => {
    setFilter(filter);
  };

  return (
    <VStack space="1">
      <Text fontSize="lg" fontWeight="semibold" color="text.500">
        Revenue
      </Text>
      <VStack space="2">
        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center" space="2">
            <VStack>
              <Text fontSize="2xs" fontWeight="medium" color="text.500">
                This week
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="darkText">
                Php 1000.00
              </Text>
            </VStack>
            <Box
              borderRadius="md"
              bgColor="error.50"
              p="1"
              justifyContent="center"
              alignItems="center"
              h="auto"
              w="auto"
            >
              <TrendingDownIcon />
            </Box>
          </HStack>
          <Text fontSize="xs" fontWeight="medium" color="text.500">
            <Text color="error.500">- Php 12 </Text>
            from last week
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
            title="Weekly Top 10"
            subtitle="Sept 4 - Today"
            onPrev={() => {}}
            onNext={() => {}}
          />
          <View>
            <LineChart
              data={mock_data}
              hideOrigin
              curved
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

export default RevenueChart;
