import { CommandBus } from '@nestjs/cqrs';
import { FeedbackFacade } from './feedback.facade';

export const feedbackFacadeFactory = (commandBus: CommandBus) =>
  new FeedbackFacade(commandBus);
