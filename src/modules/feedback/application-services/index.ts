import { ICommandHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { CreateFeedbackCommandHandler } from './commands';

export * from './feedback.facade';
export * from './feedback.facade-factory';
export * from './feedback-facade.provider';

export const FEEDBACK_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  CreateFeedbackCommandHandler,
];
