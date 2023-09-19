import { Button, IButtonProps } from "native-base";
import React from "react";

interface SelectButtonProps extends IButtonProps {
  label: string;
  selected: boolean;
}

const SelectButton = ({ label, selected, ...props }: SelectButtonProps) => {
  return (
    <Button
      {...props}
      borderRadius="full"
      size="xs"
      px="4"
      background={selected ? "primary.700" : "offWhite.300"}
      _pressed={{
        backgroundColor: `${selected ? "primary.600" : "offWhite.200"}`,
      }}
      _text={{
        fontSize: "xs",
        fontWeight: "medium",
        color: `${selected ? "white" : "primary.700"}`,
      }}
    >
      {label.toUpperCase()}
    </Button>
  );
};

export default SelectButton;
