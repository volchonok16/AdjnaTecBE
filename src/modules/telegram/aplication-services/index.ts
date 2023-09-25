import { Type } from '@nestjs/common';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { RegistrationUserCommandHandler } from './commands';
import { GetClientsQueryHandler } from './queries';

export * from './telegram.facade';
export * from './telegram.facase-factory';
export * from './telegram-facade.provider';

export const TELEGRAM_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  RegistrationUserCommandHandler,
];

export const TELEGRAM_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  GetClientsQueryHandler,
];
