import { Column, Text, View } from "native-base"
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet } from "react-native"
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Button, NotFound } from "@listed-components/atoms";
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from "expo-status-bar";
import { BottomSheet, ProductListItem } from "@listed-components/molecules";
import { ProductResponse } from "@listed-types";
import { ProductUnit } from "@listed-constants";
import { CameraPreviewMask } from "@listed-components/organisms";


const Barcode = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isProductFound, setIsProductFound] = useState(true) // toggle to see product is found state and vice versa

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setIsBottomSheetVisible(true);
    setScannedBarcode(data);
    console.log(`Barcode: ${data}`);
  };

  return (
    <>
      <StatusBar style="light" backgroundColor='rgba(1,1,1,0.6)' />
      <Stack.Screen options={{ headerShown: false }} />
      <Camera type={CameraType.back}
        ratio="16:9"
        onBarCodeScanned={scannedBarcode ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      >
        <SafeAreaView
          edges={['top', 'bottom', 'left', 'right']} >
          <CameraPreviewMask />
          <BottomSheet open={isBottomSheetVisible} onDismiss={() => {
            setScannedBarcode(undefined);
            setIsBottomSheetVisible(false);
          }}>
            <Column space="4" paddingX="2" paddingY="2">
              <View>
                <Text fontWeight="medium" textAlign="center">
                  Scanned Barcode
                </Text>
                <Text fontWeight="medium" fontSize="lg" underline
                  textAlign="center"
                >
                  {scannedBarcode}
                </Text>
              </View>
              {
                isProductFound
                  ? <ProductListItem
                    borderWidth="1"
                    borderColor="muted.400"
                    borderRadius="sm"
                    product={{ name: "Candy", variant: "Strawberry", quantity: 10, threshold: 10, unit: ProductUnit.PCS } as ProductResponse} /> // dummy data
                  : <Column alignItems="center">
                    <NotFound />
                    <Text>No Product Found</Text>
                  </Column>
              }
              {isProductFound && <Button>CONFIRM</Button>}
              <Button
                variant={`${isProductFound ? "unstyled" : "solid"}`}
                onPress={() => {
                  setScannedBarcode(undefined);
                  setIsBottomSheetVisible(false);
                }}
              >{`${isProductFound ? "CANCEL" : "TRY AGAIN"}`}</Button>
            </Column>
          </BottomSheet>
        </SafeAreaView>
      </Camera >
    </>
  )
}

export default Barcode