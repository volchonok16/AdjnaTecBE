import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DocumentFacade } from './document.facade';

export const DocumentFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
) => new DocumentFacade(commandBus, queryBus);
