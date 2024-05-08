"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EStatus = exports.EAction = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ge = __importStar(require("../../enum/global"));
const { SPOT_ACTION } = ge.Project;
var EAction;
(function (EAction) {
    EAction["BUY"] = "buy";
    EAction["SEL"] = "sell";
})(EAction || (exports.EAction = EAction = {}));
var EStatus;
(function (EStatus) {
    EStatus["BUY"] = "invested";
    EStatus["SEL"] = "sell";
})(EStatus || (exports.EStatus = EStatus = {}));
const spotSchema = new mongoose_1.Schema({
    tokenId: Number,
    token: String,
    action: {
        type: String,
        enum: Object.values(EAction) // Use the enum to validate the `action` field values
    },
    average_price: mongoose_1.Schema.Types.Number,
    prices: { type: [mongoose_1.Schema.Types.Number], default: [] },
    status: String
});
exports.default = mongoose_1.default.model(SPOT_ACTION, spotSchema);
//# sourceMappingURL=spotAction.model.js.map