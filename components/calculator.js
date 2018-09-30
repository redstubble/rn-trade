import React from 'react';
import { Text, View, Linking } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCalculatorState } from './redux-actions';
import FormTextInput from './form-text-input';
import FormPicker from './form-picker';
import { CustomSafeAreaView, CustomScrollView } from '../style/theme-styles';
import {
  CalcKeyboardAvoidingView,
  CalcFormView,
  CalcFormTextView,
  CalcFormTextLink,
} from '../style/calculator-styles';
import Header from './header';
import {
  getExchanges,
  getCurrencyPairs,
  calculateStake,
} from '../utils/calculator-form';


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleStopLossChange = this.handleStopLossChange.bind(this);
    this.handleRiskChange = this.handleRiskChange.bind(this);
    this.handleCurrencyPairChange = this.handleCurrencyPairChange.bind(this);
    this.handleExchangeChange = this.handleExchangeChange.bind(this);
  }

  state = {
    makerFee: 0.1,
    takerFee: 0.2,
    exchange: 0,
    currencyPair:0,
    risk: 0,
    entry:0,
  };

  componentDidMount = () => {
    this.handleExchangeChange();
    this.handleCurrencyPairChange();
  }


  handleCurrencyPairChange = (index = 0) => {
    const currency = getCurrencyPairs()[index];
    this.setState(prevState => ({
      ...prevState,
      currencyPair: currency.value,
      currencyFormat: currency.format,
    }));
  };

  handleExchangeChange = (index = 0) => {
    const exchange = getExchanges()[index];
    this.setState(prevState => ({
      ...prevState,
      exchange: exchange.value,
      makerFee: exchange.makerFee,
      takerFee: exchange.takerFee,      
    })
    )};

  handleEntryChange(t) {
    const n = this.numOnly(t);
    this.setState((prevState) => ({
      ...prevState,
      entry: n,
    }));
  }

  handleStopLossChange(t) {
    const n = this.numOnly(t);
    this.setState((prevState) => ({
      ...prevState,
      stopLoss: n,
    }));
  }

  handleRiskChange(t) {
    const n = this.numOnly(t);
    this.setState((prevState) => ({
      ...prevState,
      risk: n,
    }));
  }

  numOnly = (t) => t.replace(/[^0-9]/g, '');

  render({ navigation, dispatchCalculatorState } = this.props) {
    return (
      <CustomSafeAreaView>
        <Header text="Calculate Your Stake" />
        <CustomScrollView>
          <CalcKeyboardAvoidingView>
            <CalcFormView>
              <FormPicker
                name="Exchange"
                value={this.state.exchange}
                pickerValues={getExchanges()}
                handleChange={this.handleExchangeChange}
              />
              <FormPicker
                name="Currency Pair"
                value={this.state.currencyPair}
                pickerValues={getCurrencyPairs()}
                handleChange={this.handleCurrencyPairChange}
              />
              <FormTextInput
                controlFunc={this.handleEntryChange}
                name={`Entry Position (${this.state.currencyFormat})`}
              />
              <FormTextInput
                controlFunc={this.handleStopLossChange}
                name={`Stop Loss (${this.state.currencyFormat})`}
              />
              <FormTextInput
                placeholder={this.state.makerFee.toString()}
                name="Maker Fee (%)"
                locked
              />
              <FormTextInput
                placeholder={this.state.takerFee.toString()}
                name="Taker Fee (%)"
                locked
              />
              <FormTextInput
                controlFunc={this.handleRiskChange}
                name={`Risk (${this.state.currencyFormat})`}
              />
              <FormTextInput
                placeholder={calculateStake(this.state)}
                controlFunc={() => {}}
                name={`Stake (${this.state.currencyFormat})`}
                locked
              />
<Button
  title="Save to journal"
  // loading
  // loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
  titleStyle={{ fontWeight: "700" }}
  buttonStyle={{
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    margin:20,
  }}
  containerStyle={{ marginTop: 20 }}
  onPress={() => {
    if (this.state.risk < 1) {
      return;
    }
    debugger;
    dispatchCalculatorState(this.state)
    }}
/>
              <View style={{ flex: 1 }} />
              <Text>
                Market Order = Taker Fee (Taking Liquidity off market)
              </Text>
              <Text>Limit Order = Maker Fee (Adding Liquidity off market)</Text>
              <CalcFormTextLink
                onPress={() =>
                  Linking.openURL(
                    'https:support.bitfinex.com/hc/en-us/articles/213919589-What-fees-do-you-charge-',
                  )
                }
              >
                More Info On Maker/Taker Fees?
              </CalcFormTextLink>
            </CalcFormView>
          </CalcKeyboardAvoidingView>
        </CustomScrollView>
      </CustomSafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCalculatorState: (state) => dispatch(updateCalculatorState(state)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calculator);
