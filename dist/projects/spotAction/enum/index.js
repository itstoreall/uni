"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Action = exports.Token = exports.Project = void 0;
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
var Action;
(function (Action) {
    Action["BUY"] = "buy";
    Action["SELL"] = "sell";
})(Action || (exports.Action = Action = {}));
var Status;
(function (Status) {
    Status["INVESTED"] = "invested";
    Status["WITHDRAWN"] = "withdrawn";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=index.js.map