import styled from 'styled-components';
import { Platform, ScrollView } from 'react-native';
import { textWhite, backgroundRed } from '../utils/colors';

export const CustomSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
  padding-top: ${Platform.OS === 'android' ? 25 : 0};
`;

export const CustomScrollView = styled.ScrollView.attrs({
  contentContainerStyle: () => {
    return {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 40,
      paddingTop: 20,
      flexGrow: 1,
    }
  },
})`
background-color: ${backgroundRed}
`;

export const HeaderText = styled.Text`
  font-size: 20;
  color: ${textWhite};
  align-items: center;
  text-align: left;
`;

export const UserProp = styled.Text`
  font-size: 14;
  color: ${textWhite};
  align-items: center;
  text-align: left;
  font-weight: bold;
`;

export const UserValue = styled.Text`
  font-size: 14;
  color: ${textWhite};
  align-items: center;
  text-align: left;
`;
