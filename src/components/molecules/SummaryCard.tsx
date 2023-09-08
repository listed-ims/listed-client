import { Button, DataSummaryIcon, StoreNameIcon } from '@listed-components'
import { Column, Row, Text, View } from 'native-base'
import React from 'react'


interface SummaryCardProps {
  totalItemsSold: string,
  totalRevenue: string
}

const SummaryCard = ({ totalItemsSold, totalRevenue }: SummaryCardProps) => {

  return (
    <Column alignItems="center" space="4"
      padding="4"
      borderRadius="lg"
      background="primary.700">
      <Row width="full" alignItems="center" justifyContent="space-between">
        <Row alignItems="center" space="2">
          <StoreNameIcon />
          <Text color="lightText" fontSize="xl"
            fontWeight="bold">
            7/Evelen Store
          </Text>
        </Row>
        <Text color="lightText" fontSize="sm" fontWeight="regular">Today</Text>
      </Row>
      <Row width="full" paddingX="4" justifyContent="space-between" alignItems="center">
        <Column space="2">
          <View>
            <Text color="lightText" fontSize="sm" fontWeight="medium">Total Revenue</Text>
            <Text color="lightText" fontSize="lg" fontWeight="bold">{`Php ${totalRevenue}`}</Text>
          </View>
          <View>
            <Text color="lightText" fontSize="sm" fontWeight="medium">Total Items Sold</Text>
            <Text color="lightText" fontSize="lg" fontWeight="bold">{`${totalItemsSold} Products`}</Text>
          </View>
        </Column>
        <DataSummaryIcon />
      </Row>
      <Button variant="white" width="full">View Full Analytics</Button>
    </Column>
  )
}

export default SummaryCard