import { ChartNavigation, FrequencyFilter } from "@listed-components/molecules";
import { Frequency } from "@listed-constants";
import { ProductSalesResponse } from "@listed-types";
import { toCurrency } from "@listed-utils";
import { Column, HStack, Text, VStack, useTheme, Box } from "native-base";

interface BestsellingChartProps {
  data: ProductSalesResponse[];
  filter: Frequency;
  dateRange: string;
  onFilterChange: (filter: Frequency) => void;
  onPageChange: (direction: "next" | "prev") => void;
}

const BestsellingChart = ({
  data,
  filter,
  dateRange,
  onFilterChange,
  onPageChange,
}: BestsellingChartProps) => {
  const { colors } = useTheme();

  return (
    <VStack space="2">
      <Text fontSize="lg" fontWeight="semibold" color="text.500">
        Bestselling Products
      </Text>
      <Column alignItems="center" space="2">
        <ChartNavigation
          title={`${filter} Top 10`}
          subtitle={dateRange}
          onPrev={() => onPageChange("prev")}
          onNext={() => onPageChange("next")}
        />
        {data?.map((i, index) => (
          <HStack
            key={index}
            space="4"
            bgColor={index === 0 ? colors.primary[700] : colors.offWhite[400]}
            width="full"
            py={index === 0 ? "4" : "1"}
            px="4"
            borderRadius="lg"
            alignItems="center"
          >
            <Box
              bgColor={colors.white}
              w={index === 0 ? "8" : "7"}
              h={index === 0 ? "8" : "7"}
              justifyContent="center"
              alignItems="center"
              borderRadius="full"
            >
              <Text
                color={colors.primary[700]}
                fontWeight="semibold"
                fontSize="md"
              >
                {index + 1}
              </Text>
            </Box>
            <HStack justifyContent="space-between" flex="1">
              <VStack>
                <Text
                  color={index === 0 ? colors.white : colors.primary[700]}
                  fontWeight={index === 0 ? "semibold" : "medium"}
                  fontSize={index === 0 ? "md" : "sm"}
                >
                  {i.product.name}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color={index === 0 ? colors.white : colors.primary[700]}
                >{`Unit Sold: ${
                  i.totalUnitSold
                } ${i.product.unit.toLowerCase()}`}</Text>
              </VStack>
              <VStack alignItems="flex-end">
                <Text
                  fontSize={index === 0 ? "sm" : "xs"}
                  fontWeight="medium"
                  color={index === 0 ? colors.white : colors.primary[700]}
                >
                  Profit
                </Text>
                <Text
                  color={index === 0 ? colors.white : colors.primary[700]}
                  fontWeight={index === 0 ? "semibold" : "medium"}
                  fontSize={index === 0 ? "md" : "sm"}
                >
                  {toCurrency(i.totalSales)}
                </Text>
              </VStack>
            </HStack>
          </HStack>
        ))}
        <HStack>
          <FrequencyFilter filter={filter} onFilterChange={onFilterChange} />
        </HStack>
      </Column>
    </VStack>
  );
};

export default BestsellingChart;
