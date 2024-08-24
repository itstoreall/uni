import { Bot, BotError, Context, GrammyError, HttpError } from 'grammy';
import w from '../winston';

const bot = () => {
  w.fn('bot');

  const bot = new Bot(process.env.BOT_API_KEY);

  bot.api.setMyCommands([{ command: 'info', description: 'Info' }]);

  /*
  bot.command(['say_hi', 'hello', 'hi'], async ctx => {
    ctx.reply('Hello!');
  });
  
  bot.command('bot_name', async ctx => {
    await ctx.reply(`My name is UNI!`);
  });
  */

  bot.command('start', async ctx => {
    await ctx.reply(`Hi! How can I assist you today?`);
  });

  bot.command('info', async ctx => {
    const info = `id: ${ctx.from.id}\nfirstName: ${ctx.from.first_name}\nlastName: ${ctx.from.last_name}\nusername: ${ctx.from.username}\nlanguage: ${ctx.from.language_code}`;
    await ctx.reply(info); // msg, from, me
  });

  bot.hears([/yo /, /Yo /], async ctx => await ctx.reply(`Yo! What's Up man?`));

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

const errorHandler = (e: BotError<Context>) => {
  const { ctx } = e;
  w.err(`Error in Bot: ${ctx.update.update_id}`);
  const { error } = e;

  switch (true) {
    case error instanceof GrammyError:
      w.err(`ERROR in request: ${error.description}`);
      break;
    case error instanceof HttpError:
      w.err(`ERROR of Telegram: ${error}`);
      break;
    default:
      w.err(`ERROR (unknown): ${error}`);
      break;
  }
};

export default bot;
