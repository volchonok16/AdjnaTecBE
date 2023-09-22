import { CreateFeedbackDto } from '../../dto';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailManager } from '../../../../adapters/email';
import { TelegramAdapter } from '../../../../adapters/telegram';

export class SendNotificationEvent {
  constructor(public readonly dto: CreateFeedbackDto) {}
}

@EventsHandler(SendNotificationEvent)
export class SendNotificationEventHandler
  implements IEventHandler<SendNotificationEvent>
{
  constructor(
    private readonly emailManager: EmailManager,
    private readonly telegramAdapter: TelegramAdapter,
  ) {}

  async handle({ dto }: SendNotificationEvent) {
    await this.emailManager.sendNotificationEmail(dto);
    await this.telegramAdapter.sendNotification(dto);
    return;
  }
}
