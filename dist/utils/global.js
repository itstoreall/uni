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
exports.starter = exports.initApp = exports.corsCheck = exports.dbCheck = exports.isLocal = void 0;
const os_1 = __importDefault(require("os"));
const mongoose_1 = __importDefault(require("mongoose"));
const gc = __importStar(require("../config/global"));
const ge = __importStar(require("../enum/global"));
const db_1 = __importDefault(require("../db"));
require('dotenv').config();
const corsOrigin = process.env.CORS_ORIGIN;
const { kaomoji, host } = gc.system;
const { SPOT_ACTION } = ge.Project;
const dev = `${kaomoji} http://${host.local}`;
const prod = `http://${os_1.default.hostname()}`;
const isLocal = () => os_1.default.hostname().split('.').pop() === 'local';
exports.isLocal = isLocal;
const dbCheck = (mongoose) => {
    const isConnected = mongoose.connection.readyState === 2;
    return { isConnected, db: isConnected ? 'mongodb' : 'no db' };
};
exports.dbCheck = dbCheck;
const corsCheck = (origin) => String(origin).includes(corsOrigin);
exports.corsCheck = corsCheck;
// ------ App (Express):
const initApp = (args) => !(0, exports.corsCheck)(args.req.headers.origin)
    ? args.res.status(403).send('CORS!')
    : args.next();
exports.initApp = initApp;
// ------ Server:
const SpotActionModel = (0, db_1.default)(SPOT_ACTION);
const starter = (port, server, app) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    const actions = await service.getAll(SpotActionModel);
    console.log('actions --->', actions?.length);
    // */
    /*
    const action = await service.create(SpotActionModel, {
      tokenId: 4,
      token: 'avax',
      action: projectConfig.spotAction.action.BUY,
      average_price: 15.5,
      prices: [10, 21],
      status: projectConfig.spotAction.status.INVESTED
    });
    console.log('action ->', action);
    // */
    const dbName = (0, exports.dbCheck)(mongoose_1.default).db;
    console.log('');
    console.log(`  server ${(0, exports.isLocal)() ? dev : prod}:${port} -> ${dbName} `);
    console.log('');
});
exports.starter = starter;
//# sourceMappingURL=global.js.map