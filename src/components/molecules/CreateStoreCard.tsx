import { ArrowIcon } from '@listed-components/atoms'
import { Pressable, Row, Text } from 'native-base'

const CreateStoreCard = ({...props}) => {
  return (
    <Pressable {...props} backgroundColor= "primary.700" borderRadius="8">
      <Row 
      justifyContent="center" 
      paddingY="6"
      paddingX="4"
      space="4"
      >
          <Text 
          color="lightText"
          fontWeight="semibold"
          textAlign="center"
          >
              Create a store and get started
          </Text>
          <ArrowIcon/>
      </Row>
    </Pressable>
  )
}

export default CreateStoreCard