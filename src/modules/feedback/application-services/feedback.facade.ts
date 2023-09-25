import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateFeedbackDto } from '../dto';
import { CreateFeedbackCommand } from './commands';

@Injectable()
export class FeedbackFacade {
  constructor(private readonly commandBus: CommandBus) {}

  commands = {
    createFeedback: (dto: CreateFeedbackDto) => this.createFeedback(dto),
  };

  // Commands
  private async createFeedback(dto: CreateFeedbackDto): Promise<boolean> {
    const command = new CreateFeedbackCommand(dto);
    return this.commandBus.execute(command);
  }
}
