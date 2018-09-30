import React, { Component } from 'react';
import { View, Text } from 'react-native';

class FormTextWrapper extends Component {
  render({ name } = this.props) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text>{name}</Text>
        </View>
        <View style={{ flex: 1 }}>{this.props.children}</View>
      </View>
    );
  }
}

export default FormTextWrapper;
