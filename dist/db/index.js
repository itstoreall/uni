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
const ge = __importStar(require("../enum/global"));
const models_1 = __importDefault(require("./models"));
require('dotenv').config();
// const { spotAction } = gc.project;
const { SPOT_ACTION } = ge.Project;
// const url = process.env.MONGO_DB;
mongoose_1.default.connect(process.env.MONGO_DB);
// const spotSchema = new Schema({
//   action: String
// });
// const SpotModel = mongoose.model('Spot', schema.spot);
// const SpotSchema = new Schema({
//   // tokenId: Number,
//   action: String
//   // average_price: BigInt,
//   // prices: { type: [Schema.Types.String], default: [] },
//   // status: String
// });
// const SpotModel = mongoose.model('spot', SpotSchema);
const getModel = (label) => {
    // const res = new SpotModel({ action: 'buy' });
    // await res.save();
    switch (label) {
        case SPOT_ACTION:
            return models_1.default.SpotAction;
        default:
            return null;
    }
    // const res2 = await currentModel.find({});
    // console.log('res2 ===>', res2);
};
exports.default = getModel;
// let dbConnection;
// // const client = new MongoClient(url);
// const uniDB = {
//   connectToDB: (cb: any) => {},
//   getDB: dbConnection
// };
// export default uniDB;
//# sourceMappingURL=index.js.map