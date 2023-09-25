import { FeedbackFacade } from './feedback.facade';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { feedbackFacadeFactory } from './feedback.facade-factory';
import { Provider } from '@nestjs/common';

export const feedbackFacadeProvider: Provider = {
  provide: FeedbackFacade,
  inject: [CommandBus, QueryBus],
  useFactory: feedbackFacadeFactory,
};
