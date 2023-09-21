import { FeedbackFacade } from './feedback.facade';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

export const feedbackFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
  eventBus: EventBus,
) => new FeedbackFacade(commandBus, queryBus, eventBus);
