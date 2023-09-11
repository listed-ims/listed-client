import React, { ReactNode } from 'react'
import { Icon, IFormControlProps, FormControl as NBFormControl, useTheme } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { AlertOutlineIcon } from '../atoms'


interface FormControlProps extends IFormControlProps {
  children: ReactNode,
  label?: String,
  helperText?: String,
  errorMessage?: String,
}

const FormControl = ({ label, helperText, errorMessage, children, ...props }: FormControlProps) => {
  const theme = useTheme();
  return (
    <NBFormControl {...props}>
      <NBFormControl.Label _text={{ color: "darkText", fontWeight: "medium" }}>
        {label}
      </NBFormControl.Label>
      {children}
      {
        props.isInvalid ?
          <NBFormControl.ErrorMessage leftIcon={
            <AlertOutlineIcon color={theme.colors.error[600]} />
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
