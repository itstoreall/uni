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
// ------
const getAll = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model }) {
    return yield makeRequest(() => model.find({}));
});
const getByID = (_b) => __awaiter(void 0, [_b], void 0, function* ({ model, id }) {
    return yield makeRequest(() => model.findById(id));
});
const getByStatus = (_c) => __awaiter(void 0, [_c], void 0, function* ({ model, status }) {
    return yield makeRequest(() => model.find({ status }));
});
const existsByID = (_d) => __awaiter(void 0, [_d], void 0, function* ({ model, id }) {
    return yield makeRequest(() => model.exists({ _id: id }));
});
const create = (_e) => __awaiter(void 0, [_e], void 0, function* ({ model, input }) {
    return yield makeRequest(() => model.create(input));
});
const updateByID = (_f) => __awaiter(void 0, [_f], void 0, function* ({ model, id: _id, input }) {
    return yield makeRequest(() => model.updateOne({ _id }, Object.assign({}, input)));
});
const removeByID = (_g) => __awaiter(void 0, [_g], void 0, function* ({ model, id }) {
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
    getByStatus,
    existsByID,
    create,
    updateByID,
    removeByID
};
//# sourceMappingURL=index.js.map