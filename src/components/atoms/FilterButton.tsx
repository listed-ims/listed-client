import { Button } from "native-base";
import { IButtonProps } from "native-base";
import React from "react";

interface ChipProps extends IButtonProps {
  label: string;
  state: "active" | "inactive";
}

const FilterButton = ({ label, state, ...props }: ChipProps) => {
  return (
    <Button
      {...props}
      borderRadius="full"
      size="xs"
      px="4"
      background={state === "active" ? "primary.700" : "muted.100"}
      _pressed={{
        backgroundColor: `${state === "active" ? "primary.600" : "muted.200"}`,
      }}
      _text={{
        fontSize: "xs",
        fontWeight: "semibold",
        color: `${state === "active" ? "lightText" : "darkText"}`,
      }}
    >
      {label.toUpperCase()}
    </Button>
  );
};

export default FilterButton;
