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
exports.starter = exports.initApp = exports.corsCheck = exports.isLocal = void 0;
const os_1 = __importDefault(require("os"));
const graphQL_1 = __importDefault(require("../graphQL"));
const socket = __importStar(require("../socket"));
const gc = __importStar(require("../config/global"));
require('dotenv').config();
const corsOrigin = process.env.CORS_ORIGIN;
const { kaomoji, host } = gc.system;
const dev = `${kaomoji} http://${host.local}`;
const prod = `http://${os_1.default.hostname()}`;
const isLocal = () => os_1.default.hostname().split('.').pop() === 'local';
exports.isLocal = isLocal;
const corsCheck = (origin) => String(origin) === corsOrigin;
exports.corsCheck = corsCheck;
// ------ App (Express):
const initApp = (args) => !(0, exports.corsCheck)(args.req.headers.origin)
    ? args.res.status(403).send('CORS!')
    : args.next();
exports.initApp = initApp;
// ------ Server:
const starter = (port, server, app) => __awaiter(void 0, void 0, void 0, function* () {
    const isApollo = yield (0, graphQL_1.default)(app);
    const io = socket.createSocketServer(server);
    socket.connectSocket(io);
    if (!isApollo || !io)
        return;
    const dbName = 'no db';
    console.log('');
    console.log(`  server ${(0, exports.isLocal)() ? dev : prod}:${port} -> ${dbName} `);
    console.log('');
});
exports.starter = starter;
//# sourceMappingURL=global.js.map