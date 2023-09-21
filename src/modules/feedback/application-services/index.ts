import { ICommandHandler, IEventHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { CreateFeedbackCommandHandler } from './commands';
import { SendFeedbackEmailEventHandler } from './events/send-feedback-email.event-handler';

export * from './feedback.facade';
export * from './feedback.facade-factory';

export const FEEDBACK_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  CreateFeedbackCommandHandler,
];

export const FEEDBACK_EVENTS_HANDLERS: Type<IEventHandler>[] = [
  SendFeedbackEmailEventHandler,
];
