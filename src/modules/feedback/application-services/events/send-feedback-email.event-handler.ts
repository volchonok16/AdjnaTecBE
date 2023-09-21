import { CreateFeedbackDto } from '../../dto';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailManager } from '../../../../adapters/email';

export class SendFeedbackEmailEvent {
  constructor(public readonly dto: CreateFeedbackDto) {}
}

@EventsHandler(SendFeedbackEmailEvent)
export class SendFeedbackEmailEventHandler
  implements IEventHandler<SendFeedbackEmailEvent>
{
  constructor(private readonly emailManager: EmailManager) {}

  async handle({ dto }: SendFeedbackEmailEvent) {
      return this.emailManager.sendFeedbackEmail(dto);
  }
}
