import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { documentEndpoint } from '../../constants/endpoints';
import { DocumentView } from '../../../modules/documents/view';

export function ApiGetDocument() {
  return applyDecorators(
    ApiTags(documentEndpoint.default),
    ApiOperation({ summary: 'Запросить документ' }),
    //ApiQuery({ type: GetDocumentsQueryDto }), // почему-то дублирует
    ApiOkResponse({
      description: 'Возвращает PDF файл в формате base64.',
      type: DocumentView,
    }),
    ApiBadRequestResponse({ description: 'Неверно передан квери запрос' }),
    ApiNotFoundResponse({ description: 'Файл нужного типа не найден' }),
  );
}
