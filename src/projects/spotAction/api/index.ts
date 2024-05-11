import axios from 'axios';
import * as gu from '../../../utils/global';
import * as ga from '../../../api/global';
import * as c from '../config';

axios.defaults.baseURL = c.coingeckoBaseURL;

const { GET } = ga.Method;

export const getPrices = async () => {
  const config = { method: GET, url: c.url };
  return gu.isLocal()
    ? {
        bitcoin: { usd: 60000.11 },
        ethereum: { usd: 3000.22 },
        litecoin: { usd: 80.33 },
        'avalanche-2': { usd: 35.44 },
        solana: { usd: 145.55 },
        near: { usd: 7.66 }
      }
    : ga.makeRequest(config);
};
