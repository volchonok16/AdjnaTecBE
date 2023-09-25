import { TelegramFacade } from './telegram.facade';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { telegramFacadeFactory } from './telegram.facase-factory';
import { Provider } from '@nestjs/common';

export const telegramFacadeProvider: Provider = {
  provide: TelegramFacade,
  inject: [CommandBus, QueryBus],
  useFactory: telegramFacadeFactory,
};
