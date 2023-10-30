import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack, router } from 'expo-router'
import { Column, Divider, Row, Text, useTheme, View } from 'native-base'
import { AlertFilled, Button, NoAccess } from '@listed-components/atoms'

const InactiveUserUnAuthorized = () => {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar />
      <Stack.Screen options={{
        presentation: 'transparentModal',
        animation: 'fade',
        headerShown: false,
      }} />
      <View
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="full"
        width="full"
        backgroundColor='rgba(1,1,1,0.6)'
      >
        <Column
          width="90%"
          backgroundColor='white'
          borderRadius="lg"
          shadow="2"
          paddingY="2"
          space="2"
          justifyContent="center"
        >
          <Column alignItems="center" space="2" padding="2">
            <AlertFilled color={colors.error[500]} />
            <Text fontWeight="bold" fontSize="lg">
              No Access
            </Text>
          </Column>
          <Divider />
          <Column alignItems="center" space="4" padding="2">
            <Text fontSize="md" textAlign="center">
              You do not have access to this store anymore.
            </Text>
            <NoAccess />
            <Text fontSize="md" textAlign="center">
              Please contact your store owner to request access.
            </Text>
          </Column>
          <Divider />
          <Row
            width="full"
            justifyContent="center"
            padding="2"
            paddingX="4"
          >
            <Button
              flex="1"
              variant="warnSubtle" onPress={() => {
                if (router.canGoBack())
                  router.back()
              }}>
              OK
            </Button>
          </Row>
        </Column>
      </View>
    </>
  )
}

export default InactiveUserUnAuthorized