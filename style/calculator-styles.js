import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import styled from 'styled-components';

export const CalcKeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: true,
})`
  flex: 0;
  height: 100%;
`;

export const CalcFormView = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

export const CalcFormTextLink = styled.Text`
  margin: 5px;
  color: #000;
  font-size: 15px;
  text-decoration-line: underline;
`;
