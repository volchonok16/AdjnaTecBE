import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreateFeedbackDto } from '../dto';
import { CreateFeedbackCommand } from './commands';
import { SendNotificationEvent } from './events/send-notification-event.handler';

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
    sendNotification: (dto: CreateFeedbackDto) => this.sendNotification(dto),
    sendTelegramNotification: (dto: CreateFeedbackDto) =>
      this.sendNotification(dto),
  };

  // Commands
  private async createFeedback(dto: CreateFeedbackDto): Promise<boolean> {
    const command = new CreateFeedbackCommand(dto);
    return this.commandBus.execute(command);
  }

  // Events
  private sendNotification(dto: CreateFeedbackDto): void {
    const event = new SendNotificationEvent(dto);
    return this.eventBus.publish(event);
  }
}
