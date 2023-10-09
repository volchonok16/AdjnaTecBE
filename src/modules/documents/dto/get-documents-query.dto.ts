import { DocumentType } from '../../../common/enums/document-type.enum';
import { IsEnum } from 'class-validator';

export class GetDocumentsQueryDto {
  @IsEnum(DocumentType)
  document: DocumentType;
}
