import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButton } from './telegram.button';
import { buttonName } from '../../common/constants/button-name.constant';

@Update()
export class TelegramUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(`Hi, ${ctx.message.from.first_name}!`, actionButton());
  }

  @Hears(buttonName.get)
  async getClients(ctx: Context) {
    console.log(ctx);
    await ctx.reply('++');
  }
}
