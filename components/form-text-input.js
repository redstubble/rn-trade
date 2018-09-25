import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TextInput } from 'react-native';

class FormTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: props.name,
    };
  }

  render({ calculatedValue, controlFunc, styles } = this.props) {
    return (
      <TextInput
        style={[
          { backgroundColor: '#fff', padding: 10, color: '#000' },
          styles,
        ]}
        keyboardType="numeric"
        placeholderTextColor="#000"
        placeholder={
          calculatedValue || this.state.Name // placeholderTextColor="#000"
        }
        type="number"
        onChangeText={controlFunc}
        autoCorrect={false}
      />
    );
  }
}

FormTextInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormTextInput;
