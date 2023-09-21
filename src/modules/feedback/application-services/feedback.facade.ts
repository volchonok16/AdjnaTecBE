import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreateFeedbackDto } from '../dto';
import { CreateFeedbackCommand } from './commands';
import { SendFeedbackEmailEvent } from './events/send-feedback-email.event-handler';

@Injectable()
export class FeedbackFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  commands = {
    createFeedback: (dto: CreateFeedbackDto) => this.createFeedback(dto),
  };

  events = {
    sendFeedbackMail: (dto: CreateFeedbackDto) => this.sendFeedbackMail(dto),
  };

  // Commands
  private async createFeedback(dto: CreateFeedbackDto): Promise<boolean> {
    const command = new CreateFeedbackCommand(dto);
    return this.commandBus.execute(command);
  }

  // Events
  private sendFeedbackMail(dto: CreateFeedbackDto): void {
    const event = new SendFeedbackEmailEvent(dto);
    return this.eventBus.publish(event);
  }
}
