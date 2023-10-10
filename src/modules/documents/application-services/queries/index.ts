import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetDocumentsQueryHandler } from './get-documents.query-handler';

export * from './get-documents.query-handler';

export const DOCUMENT_QUERIES_HANDLER: Type<IQueryHandler>[] = [
  GetDocumentsQueryHandler,
];
