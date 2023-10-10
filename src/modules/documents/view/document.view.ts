import { ApiProperty } from '@nestjs/swagger';

export class DocumentView {
  @ApiProperty()
  document: string;
}
