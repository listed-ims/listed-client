import ScreenContainer from '../../layout/ScreenContainer'
import { Box, Button, Column, ScrollView } from 'native-base'
import FormControl from '../../components/FormControl'
import TextField from '../../components/TextField'
import { GestureResponderEvent } from 'react-native'
import BarcodeField from '../../components/BarcodeField'
import Select from '../../components/Select'
import { Picker } from '@react-native-picker/picker'

const AddProduct = () => {
  
  function handleSubmit(event: GestureResponderEvent): void {
    console.log('Submitted')
  }

  return (
    <ScreenContainer>
      <Column space="4" height="full" paddingTop="4">
        <ScrollView flex="1">
          <Column space="2" borderColor="muted.200"
            borderWidth="1"
            paddingX="4"
            paddingY="4"
            borderRadius="lg">
              <FormControl label="Product" isRequired>
                <TextField placeholder="Enter product name..." />
              </FormControl>
              <FormControl label="Barcode">
                <BarcodeField
                  fieldType="input" 
                  placeholder="Scan barcode"/>
              </FormControl> 
              <FormControl label="Size Variant" isRequired>
                <TextField placeholder="Enter size..." />
              </FormControl>
              <FormControl label="Product Unit" isRequired>
                <Select >
                  <Picker.Item label="Pieces" value="pcs" />
                  <Picker.Item label="Kilogram" value="kg" />
                  <Picker.Item label="Liters" value="L" />
                </Select>
              </FormControl>
              <FormControl label="Sale Price" isRequired>
                <TextField 
                  keyboardType="numeric"
                  startDataLabel="Php"
                  placeholder="Enter sale price..." />
              </FormControl>
              <FormControl label="Low Warning Point">
                <TextField 
                  keyboardType="numeric"
                  placeholder="Enter low warning point..." />
              </FormControl>
          </Column>
        </ScrollView>
        <Box width="full" backgroundColor="white" paddingBottom="4" marginBottom="-4">
          <Button onPress={handleSubmit}>Save Product</Button>
        </Box>
      </Column>
    </ScreenContainer >
  )
}

export default AddProduct;