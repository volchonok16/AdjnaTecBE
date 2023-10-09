import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDocumentsQueryDto } from '../dto';
import { GetDocumentsQuery } from './queries';

@Injectable()
export class DocumentFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  commands = {};

  queries = {
    getDocument: (dto: GetDocumentsQueryDto) => this.getDocument(dto),
  };

  // Queries
  private async getDocument(dto: GetDocumentsQueryDto): Promise<any> {
    const query = new GetDocumentsQuery(dto);
    return this.queryBus.execute(query);
  }
}
