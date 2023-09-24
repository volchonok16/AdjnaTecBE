import { Module, OnModuleInit } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import {
  FEEDBACK_COMMANDS_HANDLERS,
  FeedbackFacade,
  feedbackFacadeFactory,
} from './application-services';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { EmailAdapters, EmailManager } from '../../adapters/email';
import { TelegramAdapter } from '../../adapters/telegram';
import { FeedbackRepository } from './repositories/feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFormEntity } from '../../common/providers/postgres/entities/feedback-form.entity';
import { TelegramQueryRepository } from '../telegram/repositories/telegram.query-repository';
import { TelegramUserEntity } from '../../common/providers/postgres/entities/telegram-user.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FeedbackFormEntity, TelegramUserEntity]),
  ],
  controllers: [FeedbackController],
  providers: [
    EmailManager,
    EmailAdapters,
    TelegramAdapter,
    FeedbackRepository,
    TelegramQueryRepository,
    {
      provide: FeedbackFacade,
      inject: [CommandBus, QueryBus],
      useFactory: feedbackFacadeFactory,
    },
    ...FEEDBACK_COMMANDS_HANDLERS,
  ],
})
export class FeedbackModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit(): any {
    this.commandBus.register(FEEDBACK_COMMANDS_HANDLERS);
  }
}
