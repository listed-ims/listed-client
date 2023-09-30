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
  isDisabled?: false | boolean;
}

const Checkbox = ({
  isIndeterminate,
  children,
  onChange,
  value,
  isSelected,
  isDisabled,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(isSelected || false);

  useEffect(() => {
    setChecked(isSelected || false);
  }, [isSelected]);

  useEffect(() => {
    onChange && onChange(checked, value || "");
  }, [checked]);

  const handleOnChange = () => {
    if (!isDisabled) {
      const newState = !checked;
      setChecked(newState);
    }
  }

  return (
    <Pressable
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="row"
      onPress={handleOnChange}
      opacity={isDisabled ? 0.6 : 1}
      _pressed={{ opacity: 0.5 }}
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
        {checked ? <Checkmark /> : undefined}
        {isIndeterminate && (!checked) ? <RemoveIcon /> : undefined}
      </Flex>
      <Box marginLeft="2">{children}</Box>
    </Pressable>
  )
}

export default Checkbox