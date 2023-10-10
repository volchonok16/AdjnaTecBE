import { DocumentType } from '../../../common/enums';
import { IsEnum } from 'class-validator';

export class GetDocumentsQueryDto {
  @IsEnum(DocumentType)
  document: DocumentType;
}
