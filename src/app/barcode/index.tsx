import { Column, Spinner, Text, View } from "native-base"
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet } from "react-native"
import { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Button, NotFound } from "@listed-components/atoms";
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from "expo-status-bar";
import { BottomSheet, ProductListItem } from "@listed-components/molecules";
import { ProductResponse } from "@listed-types";
import { Routes } from "@listed-constants";
import { CameraPreviewMask } from "@listed-components/organisms";
import { useGetProductWithBarcode } from "@listed-hooks";
import { useAuth } from "@listed-contexts";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";


const Barcode = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const { userDetails } = useAuth();
  const { nextRoute, ids, productId } = useLocalSearchParams<{
    nextRoute: Routes,
    ids: string[],
    productId: string
  }>();
  const barcodeOnlyRoutes = [Routes.NEW_PRODUCT, Routes.EDIT_PRODUCT];

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        router.back();
      } else {
        setHasPermission(true);
      }
    })
      ();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setIsBottomSheetVisible(true);
    setScannedBarcode(data);
  };

  let queryResult: UseQueryResult<ProductResponse, AxiosError> =
    {} as UseQueryResult<ProductResponse, AxiosError>;

  if (!barcodeOnlyRoutes.includes(nextRoute!)) {
    queryResult = useGetProductWithBarcode(
      userDetails?.currentStoreId!,
      scannedBarcode!
    );
  }

  const handleConfirm = () => {
    if (!queryResult.isSuccess && !barcodeOnlyRoutes.includes(nextRoute!)) {
      return;
    }

    switch (nextRoute) {
      case Routes.NEW_INCOMING:
        router.push({
          pathname: Routes.NEW_INCOMING,
          params: {
            productId: queryResult.data?.id,
            product: `${queryResult.data?.name}${queryResult.data?.variant
              ? ` - ${queryResult.data?.variant}`
              : ""
              }`,
          },
        });
        break;
      case Routes.NEW_OUTGOING:
        router.push({
          pathname: Routes.NEW_OUTGOING,
          params: {
            ids: !!ids
              ? `${ids},${queryResult.data?.id}`
              : queryResult.data?.id,
          },
        });
        break;
      case Routes.PRODUCTS:
        router.replace(`${Routes.PRODUCTS}/${queryResult.data?.id}`);
        break;
      case Routes.NEW_PRODUCT:
        router.push({
          pathname: Routes.NEW_PRODUCT,
          params: {
            barcode: scannedBarcode,
          },
        });
        break;
      case Routes.EDIT_PRODUCT:
        router.push({
          pathname: Routes.EDIT_PRODUCT,
          params: {
            barcode: scannedBarcode,
            productId: productId,
          },
        });
        break;
      case Routes.TRANSACTIONS:
        router.push({
          pathname: Routes.TRANSACTIONS,
          params: {
            productId: queryResult.data?.id,
            product: `${queryResult.data?.name}${queryResult.data?.variant
              ? ` - ${queryResult.data?.variant}`
              : ""
              }`,
          },
        })
      default:
        break;
    }
  }

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
                queryResult.isFetching ?
                  <View paddingY="8">
                    <Spinner color="primary.700" size="lg" />
                  </View>
                  : queryResult.data && queryResult.isSuccess
                    ? <ProductListItem
                      borderWidth="1"
                      borderColor="muted.400"
                      borderRadius="sm"
                      product={queryResult.data} />
                    : (!queryResult.data && !barcodeOnlyRoutes.includes(nextRoute!)) &&
                    <Column alignItems="center">
                      <NotFound />
                      <Text>No Product Found</Text>
                    </Column>
              }
              {
                !queryResult.isFetching &&
                <>
                  {
                    ((queryResult.data && queryResult.isSuccess)
                      || (scannedBarcode && barcodeOnlyRoutes.includes(nextRoute!)))
                    && <Button
                      onPress={handleConfirm}
                    >
                      CONFIRM
                    </Button>
                  }
                  <Button
                    variant={`${(queryResult.data !== null) ? "unstyled" : "solid"}`}
                    onPress={() => {
                      setScannedBarcode(undefined);
                      setIsBottomSheetVisible(false);
                    }}
                  >{`${(queryResult.data !== null) ? "CANCEL" : "TRY AGAIN"}`}</Button>
                </>
              }
            </Column>
          </BottomSheet>
        </SafeAreaView>
      </Camera >
    </>
  )
}

export default Barcode