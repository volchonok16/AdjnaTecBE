import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramUserEntity } from '../../common/providers/postgres/entities/telegram-user.entity';
import { TelegramRepository } from './repositories/telegram.repository';
import { TelegramQueryRepository } from './repositories/telegram.query-repository';
import { FeedbackQueryRepository } from '../feedback/repositories/feedback.query-repository';
import { FeedbackFormEntity } from '../../common/providers/postgres/entities/feedback-form.entity';
import { AppConfigService } from '../../config/app-config.service';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FeedbackFormEntity, TelegramUserEntity]),
  ],
  providers: [
    AppConfigService,
    TelegramService,
    TelegramRepository,
    TelegramQueryRepository,
    FeedbackQueryRepository,
  ],
})
export class TelegramModule {}
