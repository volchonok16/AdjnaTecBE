import { Module, OnModuleInit } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FEEDBACK_COMMANDS_HANDLERS } from './application-services';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { EmailAdapters, EmailManager } from '../../adapters/email';
import { FeedbackRepository } from './repositories/feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFormEntity } from '../../common/providers/postgres/entities/feedback-form.entity';
import { TelegramQueryRepository } from '../telegram/repositories/telegram.query-repository';
import { TelegramUserEntity } from '../../common/providers/postgres/entities/telegram-user.entity';
import { feedbackFacadeProvider } from './application-services';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FeedbackFormEntity, TelegramUserEntity]),
  ],
  controllers: [FeedbackController],
  providers: [
    EmailManager,
    EmailAdapters,
    FeedbackRepository,
    TelegramQueryRepository,
    feedbackFacadeProvider,
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
