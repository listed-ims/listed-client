import {
  AddIcon,
  Button,
  ScanIcon,
  SelectButton
} from "@listed-components/atoms";
import { FormControl, TextArea } from "@listed-components/molecules";
import { KeyboardAwareScroll, ScreenContainer, OutProductItem } from "@listed-components/organisms";
import { Stack } from "expo-router";
import { Text, HStack, Column, Box, ScrollView, VStack, Row, useTheme } from "native-base";
import { stackHeaderStyles } from "@listed-styles";

const NewOutgoing = () => {

    const data = [
        {
          name: "Summit Water",
          variant: 100,
          price: 10,
          totalPrice: 10,
        },
        {
          name: "Coca Cola",
          variant: 100,
          price: 10,
          totalPrice: 10,
        },
        {
          name: "Sprite",
          variant: 100,
          price: 10,
          totalPrice: 10,
        },
        {
          name: "Royal",
          variant: 100,
          price: 10,
          totalPrice: 10,
        },
        {
          name: "Milo",
          variant: 100,
          price: 10,
          totalPrice: 10,
        },
        {
          name: "Gatorade",
          variant: 100,
          price: 10,
          totalPrice: 10,
        },
      ];

  const {colors} = useTheme();

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Outgoing")} />
      <KeyboardAwareScroll elementOnTopOfKeyboard={
        <Box background="white" paddingTop="4" paddingBottom="6">
          <Row space="4" pb="4">
            <Button 
            flex="1"
            size="sm"
            variant="outline"
            borderRadius="full"
            startIcon={<ScanIcon color={colors.primary[700]}/>}
            >
              Scan
            </Button>
            <Button 
            flex="1"
            size="sm"
            variant="outline"
            borderRadius="full"
            startIcon={<AddIcon color={colors.primary[700]}/>}
            >
              Add Product
            </Button>
          </Row>
          <Button size="lg"> 
            <Row space={4}>
              <Text 
              color="white"
              fontWeight="500"
              >
                CHECKOUT
              </Text>
              <Text 
              color="white"
              fontWeight="bold"
              >
                Php 60.00
              </Text>
            </Row>
          </Button>
        </Box>
      }>
        <Column 
        space="4"
        py="4"
        >
          <VStack space={1}>
            <Text fontSize="sm" fontWeight="medium">
              Outgoing Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space="2">
                <SelectButton label="SALES" selected={true} />
                <SelectButton label="DEFECTS" selected={false} />
                <SelectButton label="EXPIRED" selected={false} />
                <SelectButton label="LOST" selected={false} />
                <SelectButton label="CONSUMED" selected={false} />
              </HStack>
            </ScrollView>
          </VStack>
          <Column space={1}>
            <Text fontSize="sm" fontWeight="medium">
              Items
            </Text>
            <Column space={2}>
            {
            data.map((item, key)=> (
              <OutProductItem
              name={item.name}
              variant={item.variant}
              price={item.price}
              totalPrice={item.totalPrice}
              key={key}
              />
            ))
            }
            </Column>
          </Column>
          <HStack>
            <FormControl
              helperText={
                <Row flex="1" justifyContent="flex-end">
                  <Text fontSize="xs" fontWeight="normal" color="text.500">
                    0/100
                  </Text>
                </Row>}
              label={
                <>
                  <Text fontWeight="medium" fontSize="sm">
                    Comment
                  </Text>
                </>
              }>
              <TextArea
                maxLength={100}
                placeholder="Input comment here" />
            </FormControl>
          </HStack>
        </Column>
      </KeyboardAwareScroll>
    </ScreenContainer>
  );
};

export default NewOutgoing;
