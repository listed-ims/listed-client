import { Frequency } from "@listed-constants";
import { Button, HStack } from "native-base";
import React from "react";

interface FrequencyFilterProps {
  filter: Frequency;
  onFilterChange: (filter: Frequency) => void;
}

const FrequencyButton = ({ filter, onFilterChange }: FrequencyFilterProps) => {
  return (
    <HStack space="2">
      {Object.values(Frequency).map((frequency, index) => (
        <Button
          key={index}
          borderRadius="full"
          size="xs"
          background={filter === frequency ? "primary.700" : "muted.200"}
          _pressed={{
            backgroundColor: `${
              filter === frequency ? "primary.600" : "muted.300"
            }`,
          }}
          _text={{
            textTransform: "capitalize",
            fontSize: "2xs",
            fontWeight: "semibold",
            color: `${filter === frequency ? "lightText" : "darkText"}`,
          }}
          onPress={() => onFilterChange(frequency)}
        >
          {frequency}
        </Button>
      ))}
    </HStack>
  );
};

export default FrequencyButton;
