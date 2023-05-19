import React, { ReactNode } from 'react'
import { Icon, Box, IFormControlProps, FormControl as NBFormControl } from 'native-base'
import { Ionicons } from '@expo/vector-icons'


interface FormControlProps extends IFormControlProps {
  children: ReactNode,
  label: String,
  helperText?: String,
  errorMessage?: String,
}

const FormControl = ({ label, helperText, errorMessage, children, ...props }: FormControlProps) => {
  return (
    <NBFormControl {...props}>
      <NBFormControl.Label _text={{ color: "darkText", fontWeight: "medium" }}>
        {label}
      </NBFormControl.Label>
      <Box>
        {children}
      </Box>
      {
        props.isInvalid ?
          <NBFormControl.ErrorMessage leftIcon={
            <Icon as={Ionicons} name="alert-circle-outline" color="error.600" />
          }>
            {errorMessage}
          </NBFormControl.ErrorMessage>
          :
          <NBFormControl.HelperText>
            {helperText}
          </NBFormControl.HelperText>
      }
    </NBFormControl>
  )
}

export default FormControl
