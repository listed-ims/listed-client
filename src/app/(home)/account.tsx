import React, { useState } from 'react'
import { ScreenContainer } from '@listed-components/organisms'
import { FormControl, TextArea } from '@listed-components/molecules'
import { Text } from 'native-base'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Button } from '@listed-components/atoms'

const Account = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    const currentDate = date;
    setShow(false);
    setDate(currentDate!);
  };

  const showDatepicker = () => {
    setShow(true)
  };

  return (
    <ScreenContainer>
      <FormControl
        helperText={<Text fontSize="xs" color="text.500" textAlign="right">0/50</Text>}
        label="Comment">
        <TextArea placeholder="Enter comment here" />
      </FormControl>
      <Button onPress={showDatepicker}>Open Date Picker</Button>
      <Text>selected: {date.toDateString().slice(4)}</Text>
      {show && (
        <RNDateTimePicker
          accentColor={"#2E9958"}
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </ScreenContainer>
  )
}

export default Account