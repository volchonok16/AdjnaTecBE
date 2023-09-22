import { CommandBus } from '@nestjs/cqrs';
import { TelegramFacade } from '../../telegram/aplication-services';

export const telegramFacadeFactory = (commandBus: CommandBus) =>
  new TelegramFacade(commandBus);
