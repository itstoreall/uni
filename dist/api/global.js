"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = exports.Method = void 0;
const axios_1 = __importDefault(require("axios"));
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
})(Method || (exports.Method = Method = {}));
const makeRequest = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const axiosConfig = Object.assign({}, config);
        const response = yield (0, axios_1.default)(axiosConfig);
        // console.log('makeRequest data:', response.data); // *
        return response === null || response === void 0 ? void 0 : response.data;
    }
    catch (e) {
        return e.message;
    }
});
exports.makeRequest = makeRequest;
//# sourceMappingURL=global.js.map