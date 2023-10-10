import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './document.controller';
import { DOCUMENT_QUERIES_HANDLER } from './application-services/queries';
import { DocumentQueryRepository } from './repositories/document-query.repository';
import { documentFacadeProvider } from './application-services/document-facade.provider';
import { DocumentEntity } from '../../common/providers/postgres/entities/document.entity';
import { DOCUMENT_COMMAND_HANDLER } from './application-services/commands';
import { DocumentRepository } from './repositories/document.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([DocumentEntity])],
  controllers: [DocumentController],
  providers: [
    DocumentRepository,
    DocumentQueryRepository,
    documentFacadeProvider,
    ...DOCUMENT_COMMAND_HANDLER,
    ...DOCUMENT_QUERIES_HANDLER,
  ],
})
export class DocumentModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit(): any {
    this.commandBus.register(DOCUMENT_COMMAND_HANDLER);
    this.queryBus.register(DOCUMENT_QUERIES_HANDLER);
  }
}
