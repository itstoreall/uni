const tokens = [
  'bitcoin',
  'litecoin',
  'ethereum',
  'avalanche-2',
  'solana',
  'near'
].join(',');

export const coingeckoBaseURL = 'https://api.coingecko.com/api/v3/';

export const url = `${'simple/price'}?ids=${tokens}&vs_currencies=${'usd'}`;
