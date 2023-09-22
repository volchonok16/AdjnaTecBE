import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import {
  FEEDBACK_COMMANDS_HANDLERS,
  FEEDBACK_EVENTS_HANDLERS,
  FeedbackFacade,
  feedbackFacadeFactory,
} from './application-services';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { EmailAdapters, EmailManager } from '../../adapters/email';
import { TelegramAdapter } from '../../adapters/telegram';
import { FeedbackRepository } from './repositories/feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../common/providers/postgres/typeOrmConfig';
import { FeedbackFormEntity } from '../../common/providers/postgres/entities/feedback-form.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([FeedbackFormEntity])],
  controllers: [FeedbackController],
  providers: [
    EmailManager,
    EmailAdapters,
    TelegramAdapter,
    FeedbackRepository,
    {
      provide: FeedbackFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: feedbackFacadeFactory,
    },
    ...FEEDBACK_COMMANDS_HANDLERS,
    ...FEEDBACK_EVENTS_HANDLERS,
  ],
})
export class FeedbackModule {}
