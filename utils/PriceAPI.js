const url =
  'https://api.coindesk.com/v1/bpi/historical/close.json?currency=NZD';

export default () => fetch(url).then((res) => res.json());
