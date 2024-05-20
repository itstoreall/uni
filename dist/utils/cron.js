"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const runCron = (v, cb) => node_cron_1.default.schedule(v, cb);
exports.default = runCron;
// const sec = '*/10 * * * * *'
// const min = '*/10 * * * *'
//# sourceMappingURL=cron.js.map