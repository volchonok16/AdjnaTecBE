import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFeedbackDto } from '../../dto';
import { EmailManager } from '../../../../adapters/email';

export class CreateFeedbackCommand {
  constructor(public readonly dto: CreateFeedbackDto) {}
}

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackCommandHandler
  implements ICommandHandler<CreateFeedbackCommand, boolean>
{
  constructor(private readonly emailManger: EmailManager) {}

  async execute({ dto }: CreateFeedbackCommand): Promise<boolean> {
    const isSuccess = await this.emailManger.sendFeedbackEmail(dto);
    console.log(isSuccess);
    if (!isSuccess) throw new Error('Something whent wrong');
    return true;
  }
}
