import React, { useState } from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { Column, Row, ScrollView } from 'native-base'
import FormControl from '../../components/FormControl'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { GestureResponderEvent } from 'react-native'
import BarcodeField from '../../components/BarcodeField'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface ProductDetailsProps {
  navigation: NativeStackNavigationProp<any>,
}

const ProductDetails = ({ navigation }: ProductDetailsProps) => {
  const [editable, setEditable] = useState(false);
  
  function handleEdit(event: GestureResponderEvent): void {
    navigation.setOptions({ title: "Edit Product" });
    setEditable(true);
  }

  function handleDelete(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.')
  }

  function handleSave(event: GestureResponderEvent): void {
    console.log("Submitted");
    navigation.setOptions({ title: "Product Details" });
    setEditable(false);
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
            { 
              editable ?
              <>
                <FormControl label="Product">
                  <TextField defaultValue="Gatorade Blue"/>
                </FormControl>
                <FormControl label="Barcode">
                  <BarcodeField
                    defaultValue="123456789"
                    fieldType="input" 
                    placeholder="Scan barcode"/>
                </FormControl> 
                <FormControl label="Size Variant">
                  <TextField defaultValue="500 ml"/>
                </FormControl>
                <FormControl label="Sale Price">
                  <TextField defaultValue="70.00"
                    startDataLabel="Php"/>
                </FormControl>
                <FormControl label="Low Warning Point">
                  <TextField defaultValue="10"
                    endDataLabel="pcs"/>
                </FormControl>
                <FormControl label="Total Quantity" isDisabled isReadOnly>
                  <TextField value="100"
                    endDataLabel="pcs"/>
                </FormControl> 
              </> :
              <>
                <FormControl label="Product">
                  <TextField variant="underlined" isReadOnly value="Gatorade Blue"/>
                </FormControl>
                <FormControl label="Barcode">
                  <TextField variant="underlined" isReadOnly value="123456789"/>
                </FormControl>
                <FormControl label="Size Variant">
                  <TextField variant="underlined" isReadOnly value="500 ml"/>
                </FormControl>
                <FormControl label="Sale Price">
                  <TextField variant="underlined" isReadOnly value="70.00"
                    startDataLabel="Php"/>
                </FormControl>
                <FormControl label="Low Warning Point">
                  <TextField variant="underlined" isReadOnly value="10"
                    endDataLabel="pcs"/>
                </FormControl>
                <FormControl label="Total Quantity">
                  <TextField variant="underlined" isReadOnly value="100"
                    endDataLabel="pcs"/>
                </FormControl>
              </>
            }
          </Column>
        </ScrollView>
        <Row width="full" space="2" backgroundColor="white" paddingBottom="4" marginBottom="-4">
          <Button flex="1" variant="outline" onPress={handleDelete}>Delete</Button>
          {
            editable? 
            <Button flex="1" onPress={handleSave}>Save</Button>:
            <Button flex="1" onPress={handleEdit}>Edit</Button>
          }
        </Row>
      </Column>
    </ScreenContainer >
  )
}

export default ProductDetails;