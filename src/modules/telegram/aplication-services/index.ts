import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { RegistrationUserCommandHandler } from './commands';

export * from './telegram.facade';
export * from './telegram.facase-factory';

export const TELEGRAM_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  RegistrationUserCommandHandler,
];
