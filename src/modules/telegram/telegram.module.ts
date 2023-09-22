import { Module } from '@nestjs/common';
import { TelegramAdapter } from '../../adapters/telegram';
import { TelegramUpdate } from './telegramUpdate';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../common/constants';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        middlewares: [sessions.middleware()],
        token: configService.get(envConstant.telegramBotToken),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TelegramAdapter, TelegramUpdate],
})
export class TelegramModule {}
