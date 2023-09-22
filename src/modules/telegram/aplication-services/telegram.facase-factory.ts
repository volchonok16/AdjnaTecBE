import { CommandBus } from '@nestjs/cqrs';
import { TelegramFacade } from './telegram.facade';

export const feedbackFacadeFactory = (commandBus: CommandBus) =>
  new TelegramFacade(commandBus);
