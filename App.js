/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView, View, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import PriceAPI from './utils/PriceAPI';
import Calculator from './components/calculator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

const isAndroid = Platform.OS === 'android';
const iconName = isAndroid ? 'md' : 'ios';

const Post = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: '#008B7D' }]}>
    <Text style={[styles.paragraph, { color: '#fff' }]}>Post Screen</Text>
    <Button
      title="Trade screen"
      onPress={() => navigation.navigate('Trade')}
      color={isAndroid ? 'blue' : '#fff'}
    />
  </SafeAreaView>
);

class Trade extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    contacts: [],
  };

  componentDidMount() {
    PriceAPI().then((contacts) => {
      this.setState({ contacts });
    });
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#6a51ae' }]}>
        {/* <View> */}
        <Text>{JSON.stringify(this.state.contacts)}</Text>
        {/* </View> */}
        <Text style={[styles.paragraph, { color: '#fff' }]}>Trade Screen</Text>
      </SafeAreaView>
    );
  }
}

export default createBottomTabNavigator(
  {
    Calculator: {
      screen: Calculator,
      path: '/',
      navigationOptions: {
        title: 'Questions',
        tabBarLabel: 'Calculator',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={
              focused
                ? `${iconName}-checkmark-circle`
                : `${iconName}-checkmark-circle-outline`
            }
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Trade: {
      screen: Trade,
      path: '/',
      navigationOptions: {
        title: 'Entry Exit Positions',
        tabBarLabel: 'Trade',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? `${iconName}-analytics` : `${iconName}-trending-up`}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Post: {
      screen: Post,
      path: '/',
      navigationOptions: {
        title: 'Posts',
        tabBarLabel: 'Posts',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? `${iconName}-list-box` : `${iconName}-list`}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    navigationOptions: {
      tabBarOnPress: () => ({
        // StatusBar.setBarStyle('light-content');
        // isAndroid && StatusBar.setBackgroundColor('#6a51ae');
        // jumpToIndex(scene.index);
      }),
      InitialRouteName: 'Calculator',
      headerMode: 'none',
    },
  },
);

Post.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
Trade.propTypes = Post.propTypes;
