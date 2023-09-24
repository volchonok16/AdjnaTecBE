import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FeedbackFacade } from './feedback.facade';

export const feedbackFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
) => new FeedbackFacade(commandBus, queryBus);
