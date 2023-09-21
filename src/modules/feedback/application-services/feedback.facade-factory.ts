import { FeedbackFacade } from './feedback.facade';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

export const feedbackFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
) => new FeedbackFacade(commandBus, queryBus);
