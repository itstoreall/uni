"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = __importDefault(require("../projects/spotAction/graphQL/resolvers"));
const typeDefs_1 = __importDefault(require("../projects/spotAction/graphQL/typeDefs"));
const typeDefs = Object.assign({}, typeDefs_1.default);
const resolvers = Object.assign({}, resolvers_1.default);
exports.default = { typeDefs, resolvers };
//# sourceMappingURL=global.js.map