import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import {
  FEEDBACK_COMMANDS_HANDLERS,
  FeedbackFacade,
  feedbackFacadeFactory,
} from './application-services';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [FeedbackController],
  providers: [
    {
      provide: FeedbackFacade,
      inject: [CommandBus, QueryBus],
      useFactory: feedbackFacadeFactory,
    },
    ...FEEDBACK_COMMANDS_HANDLERS,
  ],
})
export class FeedbackModule {}
