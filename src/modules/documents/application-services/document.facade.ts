import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDocumentsQueryDto } from '../dto';
import { GetDocumentsQuery } from './queries';
import { DocumentView } from '../view';
import { DownloadDocumentQuery } from './queries/download-document.query';
import { UpdateDocumentPathDto } from '../dto/update-document-path.dto';
import { UpdateDocumentPathCommand } from './commands/update-document-path.command-handler';

@Injectable()
export class DocumentFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  commands = {
    updateDocumentPath: (dto: UpdateDocumentPathDto) =>
      this.updateDocumentPath(dto),
  };

  queries = {
    downloadDocument: (dto: GetDocumentsQueryDto) => this.downloadDocument(dto),
    getDocument: (dto: GetDocumentsQueryDto) => this.getDocument(dto),
  };

  // Commands
  private async updateDocumentPath(
    dto: UpdateDocumentPathDto,
  ): Promise<boolean> {
    const command = new UpdateDocumentPathCommand(dto);
    return this.commandBus.execute(command);
  }

  // Queries
  private async downloadDocument(dto: GetDocumentsQueryDto): Promise<string> {
    const query = new DownloadDocumentQuery(dto);
    return this.queryBus.execute(query);
  }

  private async getDocument(dto: GetDocumentsQueryDto): Promise<DocumentView> {
    const query = new GetDocumentsQuery(dto);
    return this.queryBus.execute(query);
  }
}
