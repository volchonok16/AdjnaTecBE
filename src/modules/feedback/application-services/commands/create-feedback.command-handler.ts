import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFeedbackDto } from '../../dto';
import { FeedbackFormEntity } from '../../../../common/providers/postgres/entities';
import { FeedbackRepository } from '../../repositories/feedback.repository';
import { TelegramQueryRepository } from '../../../telegram/repositories/telegram.query-repository';
import { TelegramAdapter } from '../../../../adapters/telegram';
import { getNotificationMessageHelper } from '../../../../common/feature/get-notification-message.helper';
import { EmailManager } from '../../../../adapters/email';

export class CreateFeedbackCommand {
  constructor(public readonly dto: CreateFeedbackDto) {}
}

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackCommandHandler
  implements ICommandHandler<CreateFeedbackCommand, boolean>
{
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly telegramQueryRepository: TelegramQueryRepository,
    private readonly telegramAdapter: TelegramAdapter,
    private readonly emailManager: EmailManager,
  ) {}

  async execute({ dto }: CreateFeedbackCommand): Promise<boolean> {
    const feedback = FeedbackFormEntity.create(dto);
    const createdFeedback = await this.feedbackRepository.createFeedback(
      feedback,
    );

    await this.sendTelegramNotification(createdFeedback);
    // await this.emailManager.sendNotificationEmail(dto);

    return true;
  }

  private async sendTelegramNotification(
    data: FeedbackFormEntity,
  ): Promise<void> {
    const recipients = await this.telegramQueryRepository.getRecipients();
    if (recipients.length) {
      const message = getNotificationMessageHelper(data);

      for (const recipient of recipients) {
        this.telegramAdapter.sendNotification(message, recipient.id);
      }
    }
    return;
  }
}
