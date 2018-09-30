export const getExchanges = () => {
  const exchanges = [
    {
      label: 'BitFinex',
      value: 'bitfinex',
      takerFee: 0.2,
      makerFee:0.1,
    },
    {
      label: 'Kraken',
      value: 'kraken',
      takerFee: 0.5,
      makerFee:0.1,
    },
    {
      label: 'Poloniex',
      value: 'poloniex',
      takerFee: 0.2,
      makerFee:0.1,
    },
    {
      label: 'BitTrex',
      value: 'bittrex',
      takerFee: 0.2,
      makerFee:0.1,
    },
    {
      label: 'Binance',
      value: 'binance',
      takerFee: 0.2,
      makerFee:0.1,
    },
    {
      label: 'BitStamp',
      value: 'bitstamp',
      takerFee: 0.2,
      makerFee:0.1,
    },
    {
      label: 'SimpleFX',
      value: 'simplefx',
      takerFee: 0.2,
      makerFee:0.1,
    },
    {
      label: 'Independent Reserve',
      value: 'independent reserve',
      takerFee: 0.2,
      makerFee:0.1,
    },
  ];
  return exchanges;
};

export const getCurrencyPairs = () => {
  const pairs = [
    {
      label: 'USD',
      value: 'usd',
      format: '$',
    },
    {
      label: 'BTC',
      value: 'btc',
      format: 'BTC'
    },
    {
      label: 'ETH',
      value: 'eth',
      format: 'ETH',
    },
  ];
  return pairs;
};

export const calculateStake = (formFields) => {
  let result;
  const { makerFee, takerFee, entry, stopLoss, risk } = formFields;
  const ent = parseFloat(entry, 10);
  const sl = parseFloat(stopLoss, 10);
  const mf = parseFloat(makerFee, 10);
  const tf = parseFloat(takerFee, 10);
  const r = parseFloat(risk, 10);
  if (!(ent && sl && mf && tf && r)) {
    result = 0;
  }

  const m = 100 / ent;
  const riskAsPercentage = (ent - sl) * m;
  const stake = r * (100 / riskAsPercentage);
  console.log('-----------');
  const stakeTf = stake * (tf / 100);
  console.log(stake);
  console.log(stakeTf);
  const stakeMf = stake * (riskAsPercentage / 100) * (mf / 100);
  console.log(riskAsPercentage / 100);
  console.log(stake * (riskAsPercentage / 100));
  console.log(stakeMf);
  result = stake - stakeTf - stakeMf;
  return result.toString();
};
