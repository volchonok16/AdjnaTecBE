import { Controller, Get, Query } from '@nestjs/common';
import { documentEndpoint } from '../../common/constants/endpoints';
import { DocumentFacade } from './application-services/document.facade';
import { GetDocumentsQueryDto } from './dto';
import { ApiGetDocument } from '../../common/swagger/document-swagger-decorators';

@Controller(documentEndpoint.default)
export class DocumentController {
  constructor(private readonly documentFacade: DocumentFacade) {}

  @Get()
  @ApiGetDocument()
  async document(@Query() query: GetDocumentsQueryDto) {
    return this.documentFacade.queries.getDocument(query);
  }
}
