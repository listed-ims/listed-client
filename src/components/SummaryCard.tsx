import { Column, Heading, Image, Row, Text } from 'native-base'
import React from 'react'


interface SummaryCardProps {
  totalItemsSold: string,
  totalRevenue: string
}

const SummaryCard = ({ totalItemsSold, totalRevenue }: SummaryCardProps) => {

  return (
    <Row justifyContent="space-between" alignItems="center"
      padding="6"
      borderRadius="2xl"
      height="140px"
      background="primary.700">
      <Column>
        <Heading flex="1" color="lightText" size="lg">
          Daily Summary
        </Heading>
        <Text color="lightText" fontSize="md" fontWeight="medium">
          {"Total Items Sold: "}
          <Text fontSize="md" fontWeight="bold">
            {totalItemsSold}
          </Text>
        </Text>
        <Text color="lightText" fontSize="md" fontWeight="medium">
          {"Total Revenue: "}
          <Text fontSize="md" fontWeight="bold">
            {totalRevenue}
          </Text>
        </Text>
      </Column>
      <Image size="16"
        tintColor="white"
        alt="daily summary icon"
        source={require("../assets/images/daily-summary-icon.png")} />
    </Row>
  )
}

export default SummaryCard