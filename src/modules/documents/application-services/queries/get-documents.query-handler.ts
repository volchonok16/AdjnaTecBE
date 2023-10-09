import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDocumentsQueryDto } from '../../dto';
import { DocumentQueryRepository } from '../../repositories/document-query.repository';

export class GetDocumentsQuery {
  constructor(public readonly dto: GetDocumentsQueryDto) {}
}

@QueryHandler(GetDocumentsQuery)
export class GetDocumentsQueryHandler
  implements IQueryHandler<GetDocumentsQuery, any>
{
  constructor(
    private readonly documentQueryRepository: DocumentQueryRepository,
  ) {}

  async execute({ dto }: GetDocumentsQuery): Promise<any> {
    return this.documentQueryRepository.getDocument(dto.document);
  }
}
