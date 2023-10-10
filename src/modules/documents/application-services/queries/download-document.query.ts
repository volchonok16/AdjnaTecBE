import { GetDocumentsQueryDto } from '../../dto';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DocumentQueryRepository } from '../../repositories/document-query.repository';

export class DownloadDocumentQuery {
  constructor(public readonly dto: GetDocumentsQueryDto) {}
}

@QueryHandler(DownloadDocumentQuery)
export class DownloadDocumentQueryHandler
  implements IQueryHandler<DownloadDocumentQuery, string>
{
  constructor(
    private readonly documentQueryRepository: DocumentQueryRepository,
  ) {}

  async execute({ dto }: DownloadDocumentQuery): Promise<string> {
    const document = await this.documentQueryRepository.getDocument(
      dto.document,
    );
    return document.url;
  }
}
