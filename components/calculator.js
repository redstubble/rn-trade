import React from 'react';
import {
  Picker,
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
  View,
  Linking,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import FormTextInput from './form-text-input';
import { CustomSafeAreaView } from '../style/text';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import Header from '../components/header';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: '100%',
    backgroundColor: '#000',
  },
  textLink: {
    margin: 5,
    color: '#000',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleStopLossChange = this.handleStopLossChange.bind(this);
    this.handleMakerFeeChange = this.handleMakerFeeChange.bind(this);
    this.handleTakerFeeChange = this.handleTakerFeeChange.bind(this);
    this.handleRiskChange = this.handleRiskChange.bind(this);
  }

  state = {
    stake: 40,
    formFields: {
      makerFee: 0.1,
      takerFee: 0.2,
    },
    prevStateFormFields: null,
  };

  componentDidMount = () =>
    this.setState({
      exchange: this.getExchanges()[0],
    });

  componentDidUpdate = () => {
    // do not check if risk has changed
    const a = this.state.formFields;
    const b = this.state.prevStateFormFields;
    if (a !== b) {
      const s = this.calculateStake();
      this.setState({ stake: s, prevStateFormFields: a });
    }
  };

  handleEntryChange(t) {
    const n = this.numOnly(t);
    this.setState((prevState) => ({
      formFields: {
        ...prevState.formFields,
        entry: n,
      },
    }));
  }

  handleStopLossChange(t) {
    const n = this.numOnly(t);
    this.setState((prevState) => ({
      formFields: {
        ...prevState.formFields,
        stopLoss: n,
      },
    }));
  }

  handleMakerFeeChange(t) {
    const n = this.numOnly(t);
    this.setState((prevState) => ({
      formFields: {
        ...prevState.formFields,
        makerFee: n,
      },
    }));
  }

  handleTakerFeeChange(t) {
    const n = this.numOnly(t);
    this.setState((prevState) => ({
      formFields: {
        ...prevState.formFields,
        takerFee: n,
      },
    }));
  }

  handleRiskChange(t) {
    const n = this.numOnly(t);
    this.setState((prevState) => ({
      formFields: {
        ...prevState.formFields,
        risk: n,
      },
    }));
  }

  numOnly = (t) => t.replace(/[^0-9]/g, '');

  calculateStake = () => {
    const { makerFee, takerFee, entry, stopLoss, risk } = this.state.formFields;
    const ent = parseFloat(entry, 10);
    const sl = parseFloat(stopLoss, 10);
    const mf = parseFloat(makerFee, 10);
    const tf = parseFloat(takerFee, 10);
    const r = parseFloat(risk, 10);
    if (!(ent && sl && mf && tf && r)) {
      return 0;
    }

    const m = 100 / ent;
    const riskAsPerc = (ent - sl) * m;
    const stake = r * (100 / riskAsPerc);
    console.log('-----------');
    const stakeTf = stake * (tf / 100);
    console.log(stake);
    console.log(stakeTf);
    const stakeMf = stake * (riskAsPerc / 100) * (mf / 100);
    console.log(riskAsPerc / 100);
    console.log(stake * (riskAsPerc / 100));
    console.log(stakeMf);
    return stake - stakeTf - stakeMf;
  };

  getExchanges = () => {
    const exchanges = [
      {
        label: 'BitFinex',
        value: 'bitfinex',
      },
      {
        label: 'Kraken',
        value: 'kraken',
      },
      {
        label: 'Poloniex',
        value: 'poloniex',
      },
      {
        label: 'BitTrex',
        value: 'bittrex',
      },
      {
        label: 'Binance',
        value: 'binance',
      },
      {
        label: 'BitStamp',
        value: 'bitstamp',
      },
      {
        label: 'SimpleFX',
        value: 'simplefx',
      },
      {
        label: 'Independent Reserve',
        value: 'independent reserve',
      },
    ];
    return exchanges;
  };

  render({ navigation } = this.props) {
    return (
      <CustomSafeAreaView style={[styles.container]}>
        <Header text="Calculate Your Stake" />
        <ScrollView
          style={{ backgroundColor: backgroundRed }}
          contentContainerStyle={
            {
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 40,
              paddingTop: 20,
              flexGrow: 1,
            }
            // justifyContent: 'space-between',
          }
        >
          <Picker
            selectedValue={this.state.exchange}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ exchange: itemValue })
            }
          >
            {this.getExchanges().map((a) => (
              <Picker.Item label={a.label} value={a.value} />
            ))}
          </Picker>
          <KeyboardAvoidingView
            style={{ flex: 0, height: '100%' }}
            behavior="padding"
            enabled
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <FormTextInput
                controlFunc={this.handleEntryChange}
                name="Entry Position"
                styles={{
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  borderColor: 'darkred',
                  borderBottomWidth: 2,
                }}
              />
              <FormTextInput
                controlFunc={this.handleStopLossChange}
                name="Stop Loss"
                styles={{
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  borderColor: 'darkred',
                  borderBottomWidth: 2,
                }}
              />
              <FormTextInput
                calculatedValue={this.state.formFields.makerFee.toString()}
                controlFunc={this.handleMakerFeeChange}
                name="Maker Fees"
                styles={{
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  borderColor: 'darkred',
                  borderBottomWidth: 2,
                }}
              />
              <FormTextInput
                calculatedValue={this.state.formFields.takerFee.toString()}
                controlFunc={this.handleTakerFeeChange}
                name="Taker Fees"
                styles={{
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  borderColor: 'darkred',
                  borderBottomWidth: 2,
                }}
              />
              <FormTextInput
                controlFunc={this.handleRiskChange}
                name="Risk"
                styles={{
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  borderColor: 'darkred',
                  borderBottomWidth: 2,
                }}
              />
              <View style={{ flex: 1 }} />
              <Text
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
              >
                Stake: {this.state.stake.toString()}
              </Text>
              <Text>
                Market Order = Taker Fee (Taking Liquidity off market)
              </Text>
              <Text>Limit Order = Maker Fee (Adding Liquidity off market)</Text>
              <Text
                style={styles.textLink}
                onPress={() =>
                  Linking.openURL(
                    'https://support.bitfinex.com/hc/en-us/articles/213919589-What-fees-do-you-charge-',
                  )
                }
              >
                More Info On Maker/Taker Fees?
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default Calculator;
