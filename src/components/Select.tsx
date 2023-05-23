import React from 'react'
import { Select as NBSelect } from 'native-base'


const Select = () => {
  return (
    <NBSelect
      variant="filled"
      backgroundColor="offWhite.200"
      size="lg"
      placeholder="Choose unit"
      isFocusVisible
      marginTop="1"
      _selectedItem={{
        backgroundColor: "primary.400",
      }}>
      <NBSelect.Item label="Kilograms" value="kg" />
      <NBSelect.Item label="Liters" value="L" />
      <NBSelect.Item label="Milliliters" value="ml" />
      <NBSelect.Item label="Pieces" value="pcs" />
    </NBSelect>
  )
}

export default Select