import { CreateFeedbackDto } from '../../dto';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailManager } from '../../../../adapters/email';
import { TelegramAdapter } from '../../../../adapters/telegram';
import { TelegramUpdate } from '../../../telegram/telegram.update';
import { getNotificationMessageHelper } from '../../../../common/feature/get-notification-message.helper';
import { TelegramFacade } from '../../../telegram/aplication-services/telegram.facade';

export class SendNotificationEvent {
  constructor(public readonly dto: CreateFeedbackDto) {}
}

@EventsHandler(SendNotificationEvent)
export class SendNotificationEventHandler
  implements IEventHandler<SendNotificationEvent>
{
  constructor(
    private readonly emailManager: EmailManager, // private readonly telegramFacade: TelegramFacade,
  ) {}

  async handle({ dto }: SendNotificationEvent) {
    // await this.emailManager.sendNotificationEmail(dto);
    // const message = getNotificationMessageHelper(dto);
    // this.telegramFacade.command.registrationUser();

    return;
  }
}
