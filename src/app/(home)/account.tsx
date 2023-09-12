import React from 'react'
import { ScreenContainer } from '@listed-components/organisms'
import { FormControl, TextArea } from '@listed-components/molecules'
import { Text } from 'native-base'

const Account = () => {
  return (
    <ScreenContainer>
      <FormControl
        helperText={<Text fontSize="xs" color="text.500" textAlign="right">0/50</Text>}
        label="Comment">
        <TextArea placeholder="Enter comment here" />
      </FormControl>
    </ScreenContainer>
  )
}

export default Account