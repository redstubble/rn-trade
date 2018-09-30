import React from 'react';
import { Picker, View } from 'react-native';
import FormTextWrapper from './form-text-wrapper';

export default (CustomPicker = (
  { handleChange, pickerValues, name, value } = this.props,
) => (
  <FormTextWrapper name={name}>
  <View style={{backgroundColor: '#FFF', marginBottom: 2}}>
    <Picker
      selectedValue={value}
      style={{}}
      onValueChange={(itemValue, itemIndex) => handleChange(itemIndex)}
    >
      {pickerValues.map((a) => (
        <Picker.Item key={a.value} label={a.label} value={a.value} />
      ))}
    </Picker>
    </View>
  </FormTextWrapper>
));
