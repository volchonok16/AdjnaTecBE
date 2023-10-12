import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDocumentsQueryDto } from '../../dto';
import { DocumentQueryRepository } from '../../repositories/document-query.repository';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';
import { DocumentView } from '../../view';

export class GetDocumentsQuery {
  constructor(public readonly dto: GetDocumentsQueryDto) {}
}

@QueryHandler(GetDocumentsQuery)
export class GetDocumentsQueryHandler
  implements IQueryHandler<GetDocumentsQuery, DocumentView>
{
  constructor(
    private readonly documentQueryRepository: DocumentQueryRepository,
  ) {}

  async execute({ dto }: GetDocumentsQuery): Promise<DocumentView> {
    let iter = 0;
    try {
      const document = await this.documentQueryRepository.getDocument(
        dto.document,
      );
      if (!document) throw new NotFoundException();
      iter++;
      const documentData = fs.readFileSync(document.url);
      iter++;
      const base64Data = documentData.toString('base64');
      iter++;
      return { document: base64Data };
    } catch (e) {
      return { document: `${iter}m, Error: ${e}` };
    }
  }
}
