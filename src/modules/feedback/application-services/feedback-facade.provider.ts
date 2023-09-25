import { Provider } from '@nestjs/common';
import { FeedbackFacade } from './feedback.facade';
import { CommandBus } from '@nestjs/cqrs';
import { feedbackFacadeFactory } from './feedback.facade-factory';

export const feedbackFacadeProvider: Provider = {
  provide: FeedbackFacade,
  inject: [CommandBus],
  useFactory: feedbackFacadeFactory,
};
