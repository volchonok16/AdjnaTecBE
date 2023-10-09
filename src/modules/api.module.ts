import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { FeedbackModule } from './feedback/feedback.module';
import { DocumentModule } from './documents/document.module';

@Module({
  imports: [FeedbackModule, TelegramModule, DocumentModule],
})
export class ApiModule {}
