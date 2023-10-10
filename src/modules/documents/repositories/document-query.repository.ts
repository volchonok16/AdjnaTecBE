import { Injectable } from '@nestjs/common';
import { DocumentType } from '../../../common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from '../../../common/providers/postgres/entities/document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentQueryRepository {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  async getDocument(documentType: DocumentType): Promise<DocumentEntity> {
    // const filter =
    //   documentType === DocumentType.All ? {} : { documentType: documentType };
    return this.documentRepository.findOne({
      where: { documentType },
    });
  }
}
