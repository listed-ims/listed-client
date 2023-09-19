import React from 'react'
import { BackIcon, HeaderSearchIcon } from '@listed-components/atoms'
import { router } from 'expo-router'
import { Row, useTheme, Button, Text } from 'native-base'
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Routes } from '@listed-constants';

const HeaderSearchField = () => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <Row
      borderBottomColor="gray.300"
      borderBottomWidth="1"
      paddingTop={insets.top + 8}
      space="4"
      justifyContent="center"
      alignItems="center"
      paddingX="4"
      height={headerHeight}
      paddingBottom="2"
    >
      <BackIcon onPress={() => router.back()} />
      <Button
        variant="unstyled"
        backgroundColor="muted.100"
        flex="1"
        justifyContent="start"
        onPress={() => { router.push(Routes.SEARCH_PRODUCTS) }}
      >
        <Row space="2">
          <HeaderSearchIcon color={colors.muted[500]} />
          <Text color="muted.400">Search products</Text>
        </Row>
      </Button>
    </Row>
  )
}

export default HeaderSearchField