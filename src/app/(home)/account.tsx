import { View, Text } from 'react-native'
import React from 'react'
import { AccountIcon } from '@listed-components/atoms'

const Account = () => {
  return (
    <View>
      <Text>Account</Text>
      <AccountIcon selected />
    </View>
  )
}

export default Account