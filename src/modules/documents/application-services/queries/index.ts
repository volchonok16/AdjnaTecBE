import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetDocumentsQueryHandler } from './get-documents.query-handler';
import { DownloadDocumentQueryHandler } from './download-document.query';

export * from './get-documents.query-handler';
export * from './download-document.query';

export const DOCUMENT_QUERIES_HANDLER: Type<IQueryHandler>[] = [
  DownloadDocumentQueryHandler,
  GetDocumentsQueryHandler,
];
