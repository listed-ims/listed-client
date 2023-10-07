import { Close } from "@listed-components/atoms";
import { router } from "expo-router";
import { Column, Pressable, Row, View, Text } from "native-base";

const CameraPreviewMask = () => {

  return (
    <Column justifyContent="center" alignItems="center" height="full" width="full" >
      <View
        flex="1"
        width="full"
        background='rgba(1,1,1,0.6)'
        paddingLeft="4"
        paddingTop="2" >
        <Pressable
          width="8"
          height="8"
          borderRadius="full"
          backgroundColor="offWhite.500"
          justifyContent="center"
          alignItems="center"
          _pressed={{
            backgroundColor: "offWhite.900"
          }}
          onPress={() => { router.back() }}
        >
          <Close />
        </Pressable>
        <Text fontWeight="bold"
          marginTop="2"
          fontSize="xl"
          textAlign="center"
          color="white"
          backgroundColor="black">
          Scan Barcode
        </Text>
        <Text marginTop="2"
          textAlign="center"
          color="white"
          backgroundColor="black">
          Align barcode inside the box.
        </Text>
      </View>
      <Row>
        <View
          flexGrow="1"
          background='rgba(1,1,1,0.6)'
        />
        <View
          width="300px"
          height="300px"
          borderWidth="1"
          borderColor="primary.700"
        />
        <View
          flexGrow="1"
          background='rgba(1,1,1,0.6)' />
      </Row>
      <View
        width="full"
        flex="1"
        background='rgba(1,1,1,0.6)'
      />
    </Column>
  );
};

export default CameraPreviewMask;
