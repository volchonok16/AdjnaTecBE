import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFeedbackDto } from '../../dto';
import { FeedbackFormEntity } from '../../../../common/providers/postgres/entities/feedback-form.entity';
import { FeedbackRepository } from '../../repositories/feedback.repository';
import { TelegramQueryRepository } from '../../../telegram/repositories/telegram.query-repository';
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
    private feedbackRepository: FeedbackRepository,
    private readonly telegramQueryRepository: TelegramQueryRepository,
    private readonly emailManager: EmailManager,
  ) {}

  async execute({ dto }: CreateFeedbackCommand): Promise<boolean> {
    const feedback = FeedbackFormEntity.create(dto);
    await this.feedbackRepository.createFeedback(feedback);

    await this.sendTelegramNotification(dto);
    // await this.emailManager.sendNotificationEmail(dto); // TODO

    return true;
  }

  private async sendTelegramNotification(
    dto: CreateFeedbackDto,
  ): Promise<void> {
    const recipients = await this.telegramQueryRepository.getRecipients();
    if (recipients.length) {
      const message = getNotificationMessageHelper(dto);
      // for (const recipient of recipients) {
      //   this.telegramAdapter.sendNotification(message, recipient.id);
      // }
    }
    return;
  }
}
