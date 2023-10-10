import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { documentEndpoint } from '../../common/constants/endpoints';
import { DocumentFacade } from './application-services/document.facade';
import { GetDocumentsQueryDto } from './dto';
import {
  ApiDownloadDocument,
  ApiGetDocument,
} from '../../common/swagger/document-swagger-decorators';
import { DocumentView } from './view';
import { Response } from 'express';
import { UpdateDocumentPathDto } from './dto/update-document-path.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller(documentEndpoint.default)
export class DocumentController {
  constructor(private readonly documentFacade: DocumentFacade) {}

  @Get()
  @ApiGetDocument()
  async getDocument(
    @Query() query: GetDocumentsQueryDto,
  ): Promise<DocumentView> {
    return this.documentFacade.queries.getDocument(query);
  }

  @Get(documentEndpoint.download)
  @ApiDownloadDocument()
  async downloadDocument(
    @Query() query: GetDocumentsQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    const document = await this.documentFacade.queries.downloadDocument(query);

    res.download(document);
  }

  @Post()
  @ApiTags('Dev endpoints')
  async updateDocumentPath(
    @Body() dto: UpdateDocumentPathDto,
  ): Promise<boolean> {
    return this.documentFacade.commands.updateDocumentPath(dto);
  }
}
