import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { View } from 'native-base';
import React, { FC, ReactNode, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native';

interface BottomSheetProps extends BottomSheetModalProps{
  open: boolean;
  children: ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = ({ open, children, ...props }) => {  
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    open 
      ? bottomSheetRef.current?.present()
      : bottomSheetRef.current?.dismiss();
  }, [open]);
  
  return (
    <BottomSheetModal
      {...props}
      ref={bottomSheetRef}
      enablePanDownToClose
      enableDynamicSizing
      maxDynamicContentSize={Dimensions.get('window').height * 0.5}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1}/>}
    >
      <BottomSheetScrollView>
        <View paddingX="4" paddingBottom="4">
          {children}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

const withModalProvider = (Component: FC<BottomSheetProps>) => ({ open, ...props }: BottomSheetProps) =>
  (
    <BottomSheetModalProvider>
      <Component {...props} open={open}/>
    </BottomSheetModalProvider>
  );


  export default withModalProvider(BottomSheet);