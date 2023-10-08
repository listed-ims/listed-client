import { Button, IButtonProps, useTheme } from "native-base";
import React from "react";
import Checkmark from "./Checkmark";


interface MultiSelectButtonProps extends IButtonProps {
  label: string;
  selected: boolean;
}

const MultiSelectButton = ({
  label,
  selected,
  ...props
}: MultiSelectButtonProps) => {

  const {colors} = useTheme();
  return (
    <Button
      {...props}
      startIcon={selected ? <Checkmark color={colors.primary[700]}/> : undefined}
      borderRadius="full"
      borderWidth="1"
      borderColor={selected ? "primary.700" : "muted.500"}
      size="xs"
      px="4"
      background={selected ? "offWhite.600" : "white"}
      _pressed={{
        backgroundColor:`${selected ? "offWhite.800" : "muted.100"}`,
      }}
      _text={{
        fontSize: "xs",
        fontWeight: "medium",
        color: `${selected ? "primary.700" : "muted.500"}`,
      }}
    >
      {label}
    </Button>
  );
};

export default MultiSelectButton;