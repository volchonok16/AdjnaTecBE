import { Module, OnModuleInit } from '@nestjs/common';
import { TelegramAdapter } from '../../adapters/telegram';
import { TelegramUpdate } from './telegram.update';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../common/constants';
import {
  TELEGRAM_COMMANDS_HANDLERS,
  TelegramFacade,
} from './aplication-services';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { telegramFacadeFactory } from '../feedback/application-services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramUserEntity } from '../../common/providers/postgres/entities/telegram-user.entity';
import { TelegramRepository } from './repositories/telegram.repository';
import { TelegramQueryRepository } from './repositories/telegram.query-repository';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TelegramUserEntity]),
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
    {
      provide: TelegramFacade,
      inject: [CommandBus],
      useFactory: telegramFacadeFactory,
    },
    ...TELEGRAM_COMMANDS_HANDLERS,
  ],
})
export class TelegramModule implements OnModuleInit {
  constructor(private readonly commandBus: CommandBus) {}

  onModuleInit(): any {
    this.commandBus.register(TELEGRAM_COMMANDS_HANDLERS);
  }
}
