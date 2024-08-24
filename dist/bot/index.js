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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const winston_1 = __importDefault(require("../winston"));
const bot = () => {
    winston_1.default.fn('bot');
    const bot = new grammy_1.Bot(process.env.BOT_API_KEY);
    bot.api.setMyCommands([{ command: 'info', description: 'Info' }]);
    /*
    bot.command(['say_hi', 'hello', 'hi'], async ctx => {
      ctx.reply('Hello!');
    });
    
    bot.command('bot_name', async ctx => {
      await ctx.reply(`My name is UNI!`);
    });
    */
    bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply(`Hi! How can I assist you today?`);
    }));
    bot.command('info', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const info = `id: ${ctx.from.id}\nfirstName: ${ctx.from.first_name}\nlastName: ${ctx.from.last_name}\nusername: ${ctx.from.username}\nlanguage: ${ctx.from.language_code}`;
        yield ctx.reply(info); // msg, from, me
    }));
    bot.hears([/yo /, /Yo /], (ctx) => __awaiter(void 0, void 0, void 0, function* () { return yield ctx.reply(`Yo! What's Up man?`); }));
    /*
    bot.on('msg').filter(
      ctx => `${ctx.from.id}` === process.env.TELEGRAM_ADMIN_ID,
      async ctx => ctx.reply('Hi Admin!')
      );
      
      bot.on('msg', async ctx => {
        await ctx.reply(`bla bla bla`);
        });
        */
    bot.catch(e => errorHandler(e));
    bot.start();
};
// ------ ERROR:
const errorHandler = (e) => {
    const { ctx } = e;
    winston_1.default.err(`Error in Bot: ${ctx.update.update_id}`);
    const { error } = e;
    switch (true) {
        case error instanceof grammy_1.GrammyError:
            winston_1.default.err(`ERROR in request: ${error.description}`);
            break;
        case error instanceof grammy_1.HttpError:
            winston_1.default.err(`ERROR of Telegram: ${error}`);
            break;
        default:
            winston_1.default.err(`ERROR (unknown): ${error}`);
            break;
    }
};
exports.default = bot;
//# sourceMappingURL=index.js.map