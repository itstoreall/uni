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
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../projects/spotAction/enum");
// ------
const getAll = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model }) {
    return yield makeRequest(() => model.find({}));
});
const getByID = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, id }) {
    return yield makeRequest(() => model.findById(id));
});
const getBTCPrise = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model }) {
    const btc = yield makeRequest(() => model.findOne({ token: enum_1.Symbol.BTC }));
    return { price: btc.current_price, date: btc.updatedAt };
});
const getByStatus = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, status }) {
    return yield makeRequest(() => model.find({ status }));
});
const existsByID = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, id }) {
    return yield makeRequest(() => model.exists({ _id: id }));
});
const create = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, input }) {
    return yield makeRequest(() => model.create(input));
});
const updateByID = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, id, input }) {
    return yield makeRequest(() => model.updateOne({ _id: id }, Object.assign({}, input)));
});
const removeByID = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, id }) {
    return yield makeRequest(() => model.deleteOne({ _id: id }));
});
const makeRequest = (cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cb();
    }
    catch (e) {
        console.error(`ERROR in makeRequest: ${e.message}`);
    }
});
exports.default = {
    getAll,
    getByID,
    getBTCPrise,
    getByStatus,
    existsByID,
    create,
    updateByID,
    removeByID
};
//# sourceMappingURL=index.js.map