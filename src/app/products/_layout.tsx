import React from 'react'
import { Stack } from 'expo-router'
import { stackHeaderStyles } from '@listed-styles'

const ProductsStackNav = () => {
  return (
    <Stack screenOptions={stackHeaderStyles} />
  )
}

export default ProductsStackNav