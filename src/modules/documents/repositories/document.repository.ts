import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from '../../../common/providers/postgres/entities/document.entity';
import { Repository } from 'typeorm';
import { UpdateDocumentPathDto } from '../dto/update-document-path.dto';

@Injectable()
export class DocumentRepository {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  async updateDocumentPath(dto: UpdateDocumentPathDto): Promise<boolean> {
    const { affected } = await this.documentRepository.update(
      { documentType: dto.documentType },
      { url: dto.path },
    );

    return affected === 1;
  }
}
