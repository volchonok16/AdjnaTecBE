import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFeedbackDto } from '../../dto';
import { FeedbackFacade } from '../feedback.facade';
import { FeedbackFormEntity } from '../../../../common/providers/postgres/entities/feedback-form.entity';
import { Inject } from '@nestjs/common';
import { FeedbackRepository } from '../../repositories/feedback.repository';

export class CreateFeedbackCommand {
  constructor(public readonly dto: CreateFeedbackDto) {}
}

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackCommandHandler
  implements ICommandHandler<CreateFeedbackCommand, boolean>
{
  constructor(
    private readonly feedbackFacade: FeedbackFacade,
    @Inject(FeedbackRepository)
    protected feedbackRepository: FeedbackRepository,
  ) {}

  async execute({ dto }: CreateFeedbackCommand): Promise<boolean> {
    this.feedbackFacade.events.sendNotification(dto);

    const feedback = FeedbackFormEntity.create(dto);
    await this.feedbackRepository.createFeedback(feedback);
    return true;
  }
}
