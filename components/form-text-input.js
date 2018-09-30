import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TextInput } from 'react-native';
import FormTextWrapper from './form-text-wrapper';

class FormTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: props.name,
    };
  }

  render({ locked, placeholder, controlFunc, name } = this.props) {
    return (
      <FormTextWrapper name={name}>
        <TextInput
          style={[
            {
              backgroundColor: '#fff',
              padding: 10,
              color: '#000',
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              borderColor: 'darkred',
              borderBottomWidth: 2,
            },
          ]}
          editable={!locked}
          keyboardType="numeric"
          placeholderTextColor="#000"
          placeholder={placeholder || this.state.Name}
          type="number"
          onChangeText={controlFunc}
          autoCorrect={false}
        />
      </FormTextWrapper>
    );
  }
}

FormTextInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormTextInput;
