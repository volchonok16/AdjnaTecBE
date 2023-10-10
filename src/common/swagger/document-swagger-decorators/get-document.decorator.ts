import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { documentEndpoint } from '../../constants/endpoints';
import { GetDocumentsQueryDto } from '../../../modules/documents/dto';

export function ApiGetDocument() {
  return applyDecorators(
    ApiTags(documentEndpoint.default),
    ApiOperation({ summary: 'Запросить документ' }),
    //ApiQuery({ type: GetDocumentsQueryDto }), // почему-то дублирует
  );
}
