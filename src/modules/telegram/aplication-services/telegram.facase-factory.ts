import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { TelegramFacade } from './telegram.facade';

export const telegramFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
) => new TelegramFacade(commandBus, queryBus);
