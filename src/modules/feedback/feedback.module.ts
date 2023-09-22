import { Module, OnModuleInit } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import {
  FEEDBACK_COMMANDS_HANDLERS,
  FEEDBACK_EVENTS_HANDLERS,
  FeedbackFacade,
} from './application-services';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { EmailAdapters, EmailManager } from '../../adapters/email';
import { TelegramAdapter } from '../../adapters/telegram';
import { FeedbackRepository } from './repositories/feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFormEntity } from '../../common/providers/postgres/entities/feedback-form.entity';
import { feedbackFacadeFactory } from '../telegram/aplication-services';

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
export class FeedbackModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  onModuleInit(): any {
    this.commandBus.register(FEEDBACK_COMMANDS_HANDLERS);
    this.eventBus.register(FEEDBACK_EVENTS_HANDLERS);
  }
}
