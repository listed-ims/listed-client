import { CaretBackIcon, CaretForwardIcon } from "@listed-components/atoms";
import { HStack, IconButton, VStack, Text } from "native-base";

interface ChartNavigationProps {
  title: string;
  subtitle: string;
  onPrev: () => void;
  onNext: () => void;
}

const ChartNavigation = ({
  title,
  subtitle,
  onPrev,
  onNext,
}: ChartNavigationProps) => {
  return (
    <HStack>
      <IconButton variant="unstyled">
        <CaretBackIcon onPress={onPrev} />
      </IconButton>
      <VStack alignItems="center">
        <Text fontSize="sm" fontWeight="medium" color="darkText">
          {title}
        </Text>
        <Text fontSize="xs" fontWeight="medium" color="text.500">
          {subtitle}
        </Text>
      </VStack>
      <IconButton variant="unstyled">
        <CaretForwardIcon onPress={onNext} />
      </IconButton>
    </HStack>
  );
};

export default ChartNavigation;
