import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../common/constants';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramAdapter {
  private readonly botId: string;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
  ) {
    this.botId = this.configService.get(envConstant.telegramBotId);
  }

  async sendNotification(message: string, recipientId: number) {
    await this.bot.telegram.sendMessage(recipientId, message);
    return;
  }
}
