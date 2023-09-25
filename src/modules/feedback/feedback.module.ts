import { Module, OnModuleInit } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import {
  FEEDBACK_COMMANDS_HANDLERS,
  feedbackFacadeProvider,
} from './application-services';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { EmailAdapters, EmailManager } from '../../adapters/email';
import { TelegramAdapter } from '../../adapters/telegram';
import { FeedbackRepository } from './repositories/feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FeedbackFormEntity,
  TelegramUserEntity,
} from '../../common/providers/postgres/entities';
import { TelegramQueryRepository } from '../telegram/repositories/telegram.query-repository';

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
    feedbackFacadeProvider,
    ...FEEDBACK_COMMANDS_HANDLERS,
  ],
})
export class FeedbackModule implements OnModuleInit {
  constructor(private readonly commandBus: CommandBus) {}

  onModuleInit(): any {
    this.commandBus.register(FEEDBACK_COMMANDS_HANDLERS);
  }
}
