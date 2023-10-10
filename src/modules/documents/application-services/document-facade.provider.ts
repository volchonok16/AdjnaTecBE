import { Provider } from '@nestjs/common';
import { DocumentFacade } from './document.facade';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DocumentFacadeFactory } from './document.facade-factory';

export const documentFacadeProvider: Provider = {
  provide: DocumentFacade,
  inject: [CommandBus, QueryBus],
  useFactory: DocumentFacadeFactory,
};
