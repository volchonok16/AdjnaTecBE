import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButton } from './telegram.button';
import { buttonName } from '../../common/constants/button-name.constant';
import { TelegramUserDto } from './dto/telegram-user.dto';
import { TelegramFacade } from './aplication-services';

@Update()
export class TelegramUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramFacade: TelegramFacade,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    const dto = TelegramUserDto.create(ctx.message.from);
    await this.telegramFacade.commands.registrationUser(dto);
    await ctx.reply(`Hi, ${ctx.message.from.first_name}!`, actionButton());
  }

  @Hears(buttonName.get)
  async getClients(ctx: Context) {
    console.log(ctx);
    await ctx.reply('++');
  }
}
