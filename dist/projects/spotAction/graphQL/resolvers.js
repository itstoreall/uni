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
// import * as ge from '../enum/global';
const service_1 = __importDefault(require("../../../db/service"));
const spotEnum = __importStar(require("../enum"));
const db_1 = require("../../../db");
const { Project } = spotEnum;
const ActionModel = (0, db_1.getModel)(Project.SPOT_ACTION);
const resolvers = {
    Query: {
        getActions: () => __awaiter(void 0, void 0, void 0, function* () {
            const params = { model: ActionModel };
            return (yield service_1.default.getAll(params));
        }),
        getActionByID: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(2);
            const params = { model: ActionModel, id: args.id };
            return yield service_1.default.getByID(params);
        }),
        getUser: (_, args) => {
            return `User ${args.id}`;
        }
    },
    Mutation: {
        addAction: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            console.log('input ->', input);
            const params = { model: ActionModel, input };
            const addedAction = yield service_1.default.create(params);
            console.log('addedAction:', addedAction);
            return addedAction;
        })
        /*
        updateUser: async (_: any, args: { id: string; input: t.UserInput }) => {
          // Assuming you have a service method to update a user and it returns the updated user
          const updatedUser = await service.updateUser(args.id, args.input);
          return updatedUser;
        }
        */
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map