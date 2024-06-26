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
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const starter_1 = __importDefault(require("./utils/starter"));
const gu = __importStar(require("./utils/global"));
const global_1 = __importDefault(require("./graphQL/global"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
app.use((req, res, next) => gu.initApp({ req, res, next }));
app.use('/api', (_, __, next) => next(0), routes_1.default);
const server = (0, http_1.createServer)(app);
const apollo = new apollo_server_express_1.ApolloServer(Object.assign({}, global_1.default));
apollo.start().then(() => apollo.applyMiddleware({ app, path: '/graphql' }));
server.listen({ port }, () => (0, starter_1.default)(String(port)));
app.use((e, _, res, __) => {
    const msg = e.message || 'Internal Server Error';
    return res.status(500).json({ error: msg });
});
//# sourceMappingURL=index.js.map