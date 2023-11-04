import { ChartNavigation, FrequencyFilter } from "@listed-components/molecules";
import { Frequency } from "@listed-constants";
import { Column, HStack, Text, VStack, useTheme, View } from "native-base";
import { useState } from "react";
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
          borderRadius="lg"
          bgColor="offWhite.200"
          py="4"
          alignItems="center"
        >
          <ChartNavigation
            title="Weekly Top 10"
            subtitle="Sept 4 - Today"
            onPrev={() => {}}
            onNext={() => {}}
          />
          <HStack w="full" justifyContent="center" alignItems="center">
            <VStack alignItems="center">
              <View pb="8" mt="-4">
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
                  noOfSections={6}
                  stepValue={10}
                  stepHeight={38}
                  maxValue={10 * 6}
                  barBorderTopRightRadius={4}
                  barBorderTopLeftRadius={4}
                  barWidth={12}
                  barMarginBottom={4}
                  spacing={12}
                  initialSpacing={0}
                  endSpacing={10}
                  height={250}
                  yAxisLabelWidth={32}
                  labelWidth={32}
                  barStyle={{
                    marginLeft: 10,
                  }}
                />
              </View>
              <Text fontSize="2xs" fontWeight="medium" color="text.500">
                REVENUE IN Php
              </Text>
            </VStack>
          </HStack>
          <HStack mt="2">
            <FrequencyFilter filter={filter} onFilter={handleSetFilter} />
          </HStack>
        </Column>
      </VStack>
    </VStack>
  );
};

export default BestsellingChart;
