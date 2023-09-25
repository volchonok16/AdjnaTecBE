import { Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramUserDto } from './dto';
import { TelegramFacade } from './aplication-services';

@Update()
export class TelegramUpdate {
  constructor(private readonly telegramFacade: TelegramFacade) {}

  @Start()
  async startCommand(ctx: Context) {
    const dto = TelegramUserDto.create(ctx.message.from);
    await this.telegramFacade.commands.registrationUser(dto);
    await ctx.reply(`Welcome, ${ctx.message.from.first_name}!`);
  }

  // @Hears(buttonName.get)
  // async getClients(ctx: Context) {
  //   const clients = await this.telegramFacade.queries.getClients();
  //   await this.sendMultipleMessage(ctx, clients);
  // }
  //
  // @Hears(buttonName.put)
  // async addNote(ctx: Context) {
  //   console.log(ctx);
  //   await ctx.reply('Примечание добавлено.');
  // }
  //
  // private async sendMultipleMessage(ctx, data: any[]) {
  //   for (const obj of data) {
  //     const message = getNotificationMessageHelper(obj);
  //     await ctx.reply(message, clientButton());
  //   }
  // }
}
