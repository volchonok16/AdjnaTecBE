import { Telegraf } from 'telegraf';
import { envConstant } from '../../common/constants';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { IBotContext } from './context';
import LocalSession from 'telegraf-session-local';
import { Command, StartCommand } from './commands';
import { TelegramRepository } from './repositories/telegram.repository';
import { TelegramQueryRepository } from './repositories/telegram.query-repository';
import { FeedbackQueryRepository } from '../feedback/repositories/feedback.query-repository';
import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  bot: Telegraf<IBotContext>;

  commands: Command[] = [];
  constructor(
    private readonly configService: AppConfigService,
    private readonly telegramRepository: TelegramRepository,
    private readonly telegramQueryRepository: TelegramQueryRepository,
    private readonly feedbackQueryRepository: FeedbackQueryRepository,
  ) {
    this.bot = new Telegraf<IBotContext>(
      this.configService.get(envConstant.telegramBotToken),
    );
    this.bot.use(
      new LocalSession({ database: 'session-db.json' }).middleware(),
    );
  }

  onModuleInit() {
    this.commands = [
      new StartCommand(
        this.bot,
        this.telegramRepository,
        this.telegramQueryRepository,
        this.feedbackQueryRepository,
      ),
    ];
    for (const command of this.commands) command.handle();
    this.bot.launch();
  }
}
