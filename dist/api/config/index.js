"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.coingeckoBaseURL = void 0;
const tokens = [
    'bitcoin',
    'litecoin',
    'ethereum',
    'avalanche-2',
    'solana',
    'near'
].join(',');
exports.coingeckoBaseURL = 'https://api.coingecko.com/api/v3/';
exports.url = `${'simple/price'}?ids=${tokens}&vs_currencies=${'usd'}`;
//# sourceMappingURL=index.js.map