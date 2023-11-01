import { CheckIcon, CheckedIcon } from '@listed-components/atoms';
import { Box, Row, Text, useTheme } from 'native-base';
import React from 'react';

interface ToastProps {
  message: string;
  hasStock?: boolean;

}
const Toast = ({ message, hasStock }: ToastProps) => {
  const { colors } = useTheme();
  return (
    <Box padding="2" marginBottom="4">
      {hasStock ? (
         <Row paddingX="8" paddingY="2" space="2" background="error.50" borderRadius="4" justifyContent="center" shadow={0}>
         <CheckIcon color={colors.error[500]} />
         <Text color="error.500"> {message}</Text>
       </Row>
       
      ) : (
        <Row paddingX="8" paddingY="2" space="2" background="primary.50" borderRadius="4" justifyContent="center" shadow={0}>
          <CheckIcon color={colors.success[700]} />
          <Text color="primary.700"> {message}</Text>
        </Row>
      )}
    </Box>
  );
};


export default Toast;

