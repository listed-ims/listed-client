import { Box, Flex, Pressable } from "native-base"
import Checkmark from "./Checkmark"
import { useEffect, useState } from "react";
import RemoveIcon from "./RemoveIcon";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";

interface CheckboxProps extends InterfaceBoxProps {
  isIndeterminate?: false | boolean;
  children?: string | React.ReactNode;
  onChange?: (state: boolean, value: string) => void;
  value?: string;
  isSelected?: boolean;
}

const Checkbox = ({
  isIndeterminate,
  children,
  onChange,
  value,
  isSelected,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isSelected!)
  }, [isSelected])

  useEffect(() => {
    if (onChange) {
      onChange(checked, value!);
    }
  }, [checked])

  return (
    <Pressable
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="row"
      onPress={() => setChecked(!checked)}
    >
      <Flex
        {...props}
        width="5"
        height="5"
        justifyContent="center"
        alignItems="center"
        borderWidth="2"
        borderRadius="sm"
        borderColor={checked || isIndeterminate ? "primary.700" : "gray.500"}
        backgroundColor={checked || isIndeterminate ? "primary.700" : "transparent"}
      >
        {checked || isSelected ? <Checkmark /> : undefined}
        {isIndeterminate && !checked ? <RemoveIcon /> : undefined}
      </Flex>
      <Box marginLeft="2">{children}</Box>
    </Pressable>
  )
}

export default Checkbox