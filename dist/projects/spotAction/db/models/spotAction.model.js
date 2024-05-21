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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const spotEnum = __importStar(require("../../enum"));
const { Project } = spotEnum;
const { String, Number } = mongoose_1.default.Schema.Types;
const required = (ts, rest) => {
    return Object.assign({ type: ts, required: true }, rest);
};
const setEnum = (enm) => {
    return { enum: Object.values(enm), lowercase: true };
};
const setDate = (immutable, dateNow) => {
    return { type: Date, immutable, default: dateNow };
};
const spotSchema = new mongoose_1.default.Schema({
    tokenId: required(Number, { min: 1 }),
    token: required(String),
    action: required(String, setEnum(spotEnum.Action)),
    average_price: required(Number),
    current_price: required(Number),
    prices: required([Number], { default: [] }),
    percent: required(Number),
    status: required(String, setEnum(spotEnum.Status)),
    createdAt: required(Date, setDate(true, Date.now())),
    updatedAt: required(String)
});
exports.default = mongoose_1.default.model(Project.SPOT_ACTION, spotSchema);
//# sourceMappingURL=spotAction.model.js.map