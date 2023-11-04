import { ChartNavigation, FrequencyFilter } from "@listed-components/molecules";
import { Frequency } from "@listed-constants";
import { Column, HStack, Text, VStack, useTheme } from "native-base";
import { useState } from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const mock_data = [
  { value: 50, label: "Premium Smartphone X" },
  { value: 48, label: "Wireless Noise-Canceling Headphones" },
  { value: 30, label: "Ultra HD 4K Smart TV" },
  { value: 26, label: "Laptop Pro Series" },
  { value: 25, label: "Coffee Maker Deluxe" },
  { value: 19, label: "Designer Leather Handbag" },
  { value: 11, label: "Professional DSLR Camera" },
  { value: 10, label: "Gaming Console Elite" },
  { value: 9, label: "Fitness Tracker Pro" },
  { value: 7, label: "Smart Home Speaker System" },
];

const BestsellingChart = () => {
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
        Bestselling Products
      </Text>
      <VStack space="2">
        <VStack>
          <Text fontSize="2xs" fontWeight="medium" color="text.500">
            Top Product
          </Text>
          <HStack space="2" alignItems="center">
            <Text fontSize="md" fontWeight="semibold" color="darkText">
              Nature's Spring
            </Text>
            <Text fontSize="2xs" fontWeight="medium" color="text.500">
              Revenue: Php 625.00
            </Text>
          </HStack>
        </VStack>

        <Column
          space="1"
          borderRadius="lg"
          bgColor="offWhite.200"
          p="4"
          alignItems="center"
        >
          <ChartNavigation
            title="Weekly Top 10"
            subtitle="Sept 4 - Today"
            onPrev={() => {}}
            onNext={() => {}}
          />

          <View style={{ paddingBottom: 64 }}>
            <BarChart
              data={data}
              horizontal
              hideOrigin
              rulesColor={colors.primary[500]}
              yAxisColor={colors.muted[200]}
              xAxisColor={colors.muted[200]}
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
              stepValue={10}
              maxValue={10 * 5}
              barBorderTopRightRadius={4}
              barBorderTopLeftRadius={4}
              barWidth={12}
              barMarginBottom={4}
              spacing={12}
              height={250}
            />
          </View>
          <HStack mt="2">
            <FrequencyFilter filter={filter} onFilter={handleSetFilter} />
          </HStack>
        </Column>
      </VStack>
    </VStack>
  );
};

export default BestsellingChart;
