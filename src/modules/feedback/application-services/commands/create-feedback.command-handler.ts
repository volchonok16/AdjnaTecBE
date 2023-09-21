import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFeedbackDto } from '../../dto/create-feedback.dto';

export class CreateFeedbackCommand {
  constructor(public readonly dto: CreateFeedbackDto) {}
}

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackCommandHandler
  implements ICommandHandler<CreateFeedbackCommand, boolean>
{
  async execute({ dto }: CreateFeedbackCommand): Promise<boolean> {
    return true;
  }
}
