import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateDocumentPathCommandHandler } from './update-document-path.command-handler';

export * from './update-document-path.command-handler';

export const DOCUMENT_COMMAND_HANDLER: Type<ICommandHandler>[] = [
  UpdateDocumentPathCommandHandler,
];
