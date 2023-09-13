import React, { ReactNode } from 'react'
import { IFormControlProps, FormControl as NBFormControl, useTheme } from 'native-base'
import { AlertOutlineIcon } from '@listed-components/atoms';


interface FormControlProps extends IFormControlProps {
  children: ReactNode,
  label?: ReactNode | String,
  helperText?: ReactNode | String,
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
