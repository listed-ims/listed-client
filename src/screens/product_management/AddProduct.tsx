import ScreenContainer from '../../layout/ScreenContainer'
import { Box, Button, Column, ScrollView } from 'native-base'
import FormControl from '../../components/FormControl'
import TextField from '../../components/TextField'
import { GestureResponderEvent, Keyboard } from 'react-native'
import BarcodeField from '../../components/BarcodeField'
import Select from '../../components/Select'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface AddProductProps {
  navigation: NativeStackNavigationProp<any>,
}

const AddProduct = ({ navigation }: AddProductProps) => {
  const [errors, setErrors] = useState({name: "", barcode: "", variant: "", unit: "", salePrice: "", threshold: ""});
  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    variant: "",
    unit: "",
    salePrice: "",
    threshold: "",
  });

  const validate = () => {
    Keyboard.dismiss();
    if(formData.name === "") {
      handleErrors("Please enter product name.", "name");
      return false;
    } else if(formData.unit === "") {
      handleErrors("Please select product unit.", "unit");
      return false;
    } else if(formData.salePrice === "") {
      handleErrors("Please enter sale price.", "salePrice");
      return false;
    } else if(isNaN(Number(formData.salePrice)) || Number(formData.salePrice) < 0) {
      handleErrors("Please enter a valid sale price.", "salePrice");
      return false;
    } else if(isNaN(Number(formData.threshold)) || Number(formData.threshold) < 0) {
      handleErrors("Please enter a valid threshold.", "threshold");
      return false;
    } else {
      return true;
    }
  }
  
  const handleErrors = (error: string, data: string) => {
    setErrors({...errors, [data]: error});
  };

  const handleOnchange = (value: string, data: string) => {
    setFormData({...formData, [data]: value});
  };
  
  const handleSave = (event: GestureResponderEvent) => {
    setErrors({name: "", barcode: "", variant: "", unit: "", salePrice: "", threshold: ""});
    if(validate()) {
      console.log('Submitted');
      navigation.navigate("Products");
    }
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
              <FormControl label="Product" isRequired errorMessage={errors.name} isInvalid={errors.name !== ""}>
                <TextField placeholder="Enter product name..." 
                  onFocus={() => handleErrors("", "name")}
                  onChangeText={value => handleOnchange(value, "name")}/>
              </FormControl>
              <FormControl label="Barcode" errorMessage={errors.barcode} isInvalid={errors.barcode !== ""}>
                <BarcodeField 
                  fieldType="input" placeholder="Scan barcode"
                  onFocus={() => handleErrors("", "barcode")}
                  onChangeText={value => handleOnchange(value, "barcode")}/>
                </FormControl> 
              <FormControl label="Size Variant" errorMessage={errors.variant} isInvalid={errors.variant !== ""}>
                <TextField placeholder="Enter size..." 
                  onFocus={() => handleErrors("", "variant")}
                  onChangeText={value => handleOnchange(value, "variant")}/>
              </FormControl>
              <FormControl label="Product Unit" isRequired errorMessage={errors.unit} isInvalid={errors.unit !== ""}>
                <Select onChangeValue={(value) => {handleOnchange(value, "unit"); handleErrors("", "unit");}}>
                  <Picker.Item label="Pieces" value="pcs" />
                  <Picker.Item label="Kilogram" value="kg" />
                  <Picker.Item label="Liters" value="L" />
                </Select>
              </FormControl>
              <FormControl label="Sale Price" isRequired errorMessage={errors.salePrice} isInvalid={errors.salePrice !== ""}>
                <TextField keyboardType="numeric" startDataLabel="Php" placeholder="Enter sale price..." 
                  onFocus={() => handleErrors("", "salePrice")}
                  onChangeText={value => handleOnchange(value, "salePrice")}/>
              </FormControl>
              <FormControl label="Low Warning Point" errorMessage={errors.threshold} isInvalid={errors.threshold !== ""}>
                <TextField keyboardType="numeric" placeholder="Enter low warning point..." 
                  onFocus={() => handleErrors("", "threshold")}
                  onChangeText={value => handleOnchange(value, "threshold")}/>
              </FormControl>
          </Column>
        </ScrollView>
        <Box width="full" backgroundColor="white" paddingBottom="4" marginBottom="-4">
          <Button onPress={handleSave}>Save Product</Button>
        </Box>
      </Column>
    </ScreenContainer >
  )
}

export default AddProduct;