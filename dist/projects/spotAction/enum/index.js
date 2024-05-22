"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Action = exports.Symbol = exports.Token = exports.Project = void 0;
var Project;
(function (Project) {
    Project["SPOT_ACTION"] = "spot_action";
})(Project || (exports.Project = Project = {}));
var Token;
(function (Token) {
    Token["BITCOIN"] = "bitcoin";
    Token["ETHEREUM"] = "ethereum";
    Token["LITECOIN"] = "litecoin";
    Token["AVALANCHE"] = "avalanche-2";
    Token["SOLANA"] = "solana";
    Token["NEAR"] = "near";
})(Token || (exports.Token = Token = {}));
var Symbol;
(function (Symbol) {
    Symbol["BTC"] = "btc";
    Symbol["ETH"] = "eth";
    Symbol["LTC"] = "ltc";
    Symbol["AVAX"] = "avax";
    Symbol["SOL"] = "sol";
    Symbol["NEAR"] = "near";
})(Symbol || (exports.Symbol = Symbol = {}));
var Action;
(function (Action) {
    Action["INIT"] = "init";
    Action["BUY"] = "buy";
    Action["SELL"] = "sell";
})(Action || (exports.Action = Action = {}));
var Status;
(function (Status) {
    Status["INIT"] = "init";
    Status["INVESTED"] = "invested";
    Status["WITHDRAWN"] = "withdrawn";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=index.js.map