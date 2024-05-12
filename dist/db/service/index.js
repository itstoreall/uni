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
const getAll = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model }) {
    return yield model.find({});
});
// const getAll = async (model: typeof Model): t.SpotActionRes => {
//   return await model.find({});
// };
const getByID = (_b) => __awaiter(void 0, [_b], void 0, function* ({ model, id }) {
    return yield model.findById(id);
});
const create = (_c) => __awaiter(void 0, [_c], void 0, function* ({ model, input }) { return yield model.create(input); });
exports.default = { getAll, getByID, create };
//# sourceMappingURL=index.js.map