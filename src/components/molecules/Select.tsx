import { Picker } from '@react-native-picker/picker'
import { useTheme } from 'native-base';
import React, { ReactNode, useState } from 'react'
import { View, StyleSheet } from 'react-native';


interface SelectProps {
  children: Array<ReactNode> | ReactNode,
  onChangeValue?: (itemValue: any) => void,
}

const Select = ({ children, onChangeValue }: SelectProps) => {
  const { colors } = useTheme();

  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (itemValue: any) => {
    setSelectedValue(itemValue);
    onChangeValue ? onChangeValue(itemValue) : undefined;
  }

  return (
    <View style={styles.pickerContainer} >
      <Picker
        prompt="Select product unit"
        style={{ backgroundColor: colors.offWhite[200], }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) =>
          handleValueChange(itemValue)
        }>
        {selectedValue === null && (
          <Picker.Item
            color={colors.text[400]}
            label="Select an option..."
            value={null} />
        )}
        {Array.isArray(children) ? children.map(item => item) : children}
      </Picker>
    </View >
  )
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderRadius: 4,
    overflow: 'hidden',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
  }
});


export default Select