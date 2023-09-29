import { CheckIcon } from '@listed-components/atoms';
import { Box, Row, Text } from 'native-base';
import React from 'react';

interface ToastProps {
  message: string;
}
const Toast = ({ message }:ToastProps) => {

  return (
      <Box marginBottom= "4">
        <Row padding= "2" space = "2" backgroundColor= "success.600" borderRadius= "4"  alignItems= "center">
          <CheckIcon/>
          <Text color= "white" >{message}</Text>
        </Row>
      </Box>
  );
};

export default Toast;

