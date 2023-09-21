import { Module } from '@nestjs/common';
import { TelegramAdapter } from '../../adapters/telegram';
import { TelegramController } from './telegram.controller';

@Module({
  controllers: [TelegramController],
  providers: [TelegramAdapter],
})
export class TelegramModule {}
