import { Command } from './command.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context';
import { TelegramRepository } from '../repositories/telegram.repository';
import { TelegramQueryRepository } from '../repositories/telegram.query-repository';
import { TelegramUserDto } from '../dto';
import { clientButton, mainActionButton } from '../buttons';
import { buttonName } from '../../../common/constants';
import { FeedbackQueryRepository } from '../../feedback/repositories/feedback.query-repository';
import { getNotificationMessageHelper } from '../../../common/feature/get-notification-message.helper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StartCommand extends Command {
  constructor(
    bot: Telegraf<IBotContext>,
    private readonly telegramRepository: TelegramRepository,
    private readonly telegramQueryRepository: TelegramQueryRepository,
    private readonly feedbackQueryRepository: FeedbackQueryRepository,
  ) {
    super(bot);
  }

  handle() {
    this.bot.start(async (ctx) => {
      const dto = TelegramUserDto.create(ctx.message.from);
      await this.registerUser(dto);
      await ctx.reply(
        `Hi, ${ctx.message.from.first_name}!`,
        mainActionButton(),
      );
    });

    this.bot.action(buttonName.get, async (ctx) => {
      const pageNumber = 0;
      ctx.sessions.pageNumber = pageNumber;
      const clients = await this.feedbackQueryRepository.getClients(pageNumber);
      await this.sendMultipleMessage(ctx, clients);
    });

    this.bot.action(buttonName.next, async (ctx) => {
      const pageNumber = ctx.sessions.pageNumber + 1;
      ctx.sessions.pageNumber = pageNumber;
      const clients = await this.feedbackQueryRepository.getClients(pageNumber);
      if (clients.length) {
        await this.sendMultipleMessage(ctx, clients);
      } else {
        await ctx.reply('There are no more processed requests!');
      }
    });

    this.bot.action(buttonName.back, async (ctx) => {
      const pageNumber = ctx.sessions.pageNumber - 1;
      if (pageNumber >= 0) {
        ctx.sessions.pageNumber = pageNumber;
        const clients = await this.feedbackQueryRepository.getClients(
          pageNumber,
        );
        await this.sendMultipleMessage(ctx, clients);
      } else {
        await ctx.reply('This is the first page!');
      }
    });
  }

  private async registerUser(dto: TelegramUserDto): Promise<boolean> {
    const isExists = await this.telegramQueryRepository.userExists(dto.id);
    if (!isExists) await this.telegramRepository.registrationUser(dto);

    return true;
  }

  private async sendMultipleMessage(ctx, data: any[]) {
    for (const obj of data) {
      const message = getNotificationMessageHelper(obj);
      await ctx.reply(message, clientButton());
    }
  }
}
