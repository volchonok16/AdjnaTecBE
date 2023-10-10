import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DocumentType } from '../../../common/enums';

export class UpdateDocumentPathDto {
  @ApiProperty()
  @IsEnum(DocumentType)
  documentType: string;

  @ApiProperty()
  @IsString()
  path: string;
}
