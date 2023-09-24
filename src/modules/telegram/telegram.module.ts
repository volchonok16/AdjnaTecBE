import { Module, OnModuleInit } from '@nestjs/common';
import { TelegramAdapter } from '../../adapters/telegram';
import { TelegramUpdate } from './telegram.update';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../common/constants';
import {
  TELEGRAM_COMMANDS_HANDLERS,
  TELEGRAM_QUERIES_HANDLERS,
  TelegramFacade,
  telegramFacadeFactory,
} from './aplication-services';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramUserEntity } from '../../common/providers/postgres/entities/telegram-user.entity';
import { TelegramRepository } from './repositories/telegram.repository';
import { TelegramQueryRepository } from './repositories/telegram.query-repository';
import { FeedbackQueryRepository } from '../feedback/repositories/feedback.query-repository';
import { FeedbackFormEntity } from '../../common/providers/postgres/entities/feedback-form.entity';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FeedbackFormEntity, TelegramUserEntity]),
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        middlewares: [sessions.middleware()],
        token: configService.get(envConstant.telegramBotToken),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    TelegramAdapter,
    TelegramUpdate,
    TelegramRepository,
    TelegramQueryRepository,
    FeedbackQueryRepository,
    {
      provide: TelegramFacade,
      inject: [CommandBus, QueryBus],
      useFactory: telegramFacadeFactory,
    },
    ...TELEGRAM_COMMANDS_HANDLERS,
    ...TELEGRAM_QUERIES_HANDLERS,
  ],
})
export class TelegramModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit(): any {
    this.commandBus.register(TELEGRAM_COMMANDS_HANDLERS);
    this.queryBus.register(TELEGRAM_QUERIES_HANDLERS);
  }
}
