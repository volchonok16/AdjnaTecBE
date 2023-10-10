import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { documentEndpoint } from '../../constants/endpoints';

export function ApiDownloadDocument() {
  return applyDecorators(
    ApiTags(documentEndpoint.default),
    ApiOperation({ summary: 'Скачать документ' }),
    ApiOkResponse({
      description: 'Позволяет скачать файл',
    }),
    ApiBadRequestResponse({ description: 'Неверно передан квери запрос' }),
    ApiNotFoundResponse({ description: 'Файл нужного типа не найден' }),
  );
}
