import { Box, Text, Row, IconButton } from "native-base";
import React from "react";
import { RemoveIcon, PlusIcon } from "@listed-components/atoms";

interface QuantityProps {
    quantity: number;
}

const Quantity = ({quantity}: QuantityProps) => {
  return (
    <Box 
    p="1"
    borderRadius="sm"
    background="offWhite.500"
    >
      <Row alignItems="center">
        <IconButton
        icon={<RemoveIcon />} 
        variant="solid"
        size="xs"
        />
        <Box
        width={8}
        justifyContent="center"
        alignItems="center"
        alignSelf="stretch"
        flexGrow={1}
        >
          <Text
          fontWeight="medium"
          color="muted.600"
          >
            {quantity}
          </Text>
        </Box>
        <IconButton
        icon={<PlusIcon />} 
        variant="solid" 
        size="xs"
        />
      </Row>
    </Box>
  );
};

export default Quantity;
