import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [FeedbackModule, TelegramModule],
})
export class ApiModule {}
