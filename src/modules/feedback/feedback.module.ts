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

@Module({
  imports: [CqrsModule],
  controllers: [FeedbackController],
  providers: [
    EmailManager,
    EmailAdapters,
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
