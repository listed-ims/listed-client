import { Frequency } from "@listed-constants";
import { Button, HStack } from "native-base";
import React from "react";

interface FrequencyFilterProps {
  filter: Frequency;
  onFilter: (filter: Frequency) => void;
}

const FrequencyButton = ({ filter, onFilter }: FrequencyFilterProps) => {
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
            fontSize: "2xs",
            fontWeight: "semibold",
            color: `${filter === frequency ? "lightText" : "darkText"}`,
          }}
          onPress={() => onFilter(frequency)}
        >
          {frequency.slice(0, 1)}
        </Button>
      ))}
    </HStack>
  );
};

export default FrequencyButton;
