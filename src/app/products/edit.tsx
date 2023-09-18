import { FormControl, TextField } from '@listed-components/molecules'
import ScreenContainer from '@listed-components/organisms/ScreenContainer'
import { Box, Column, Row, Text } from 'native-base'
import React from 'react'
import { Stack } from 'expo-router'
import { Button, ScanIcon } from "@listed-components/atoms";
import { stackHeaderStyles } from '@listed-styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const EditProduct = ({ }) => {

    return (
        <ScreenContainer withHeader>
            <Stack.Screen options={stackHeaderStyles("Edit Product")} />
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <Column>
                    <Row paddingY="6">
                        <Text fontSize="18px" fontWeight="600">Edit Product Details</Text>
                    </Row>
                    <FormControl label="Product" >
                        <TextField flex="1" placeholder="Enter product name" value={"Nature's Spring"} />

                    </FormControl>
                    <FormControl label={
                        <>
                            <Text fontWeight="medium" fontSize="sm">Barcode</Text>
                            <Text fontWeight="medium" fontSize="sm" color="text.500">{" "}(optional)</Text>
                        </>
                    }
                    >
                        <Row space="2">
                            <TextField flex="1" placeholder='Scan barcode' value={"132987905"} />
                            <Button fontSize="sm" startIcon={<ScanIcon />}>Scan</Button>
                        </Row>
                    </FormControl>
                    <FormControl label={
                        <>
                            <Text fontWeight="medium" fontSize="sm">Variant</Text>
                            <Text fontWeight="medium" fontSize="sm" color="text.500">{" "}(optional)</Text>
                        </>
                    }
                    >
                        <TextField placeholder='Enter variant' value={"100 ml"} />
                    </FormControl>
                    <FormControl label="Sale Price per Item">
                        <TextField flex="1" placeholder='Enter sale price' value={"10.00"} startDataLabel={'Php'} />
                    </FormControl>

                    <FormControl label={
                        <>
                            <Text fontWeight="medium" fontSize="sm">Low Warning Point</Text>
                            <Text fontWeight="medium" fontSize="sm" color="text.500">{" "}(optional)</Text>
                        </>
                    }
                    >
                        <TextField placeholder="Enter low warning point" value={"10"} endDataLabel={"pcs"} />
                    </FormControl>
                </Column>
            </KeyboardAwareScrollView>
            <Box background=" white" paddingTop="4" paddingBottom="6">
                <Row space="4" >
                    <Button flex="1">Save</Button>
                    <Button flex="1" variant="outline" >Cancel</Button>
                </Row>
            </Box>
        </ScreenContainer>
    )
}
export default EditProduct