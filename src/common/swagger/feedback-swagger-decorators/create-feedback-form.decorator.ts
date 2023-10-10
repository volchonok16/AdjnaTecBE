import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { feedbackEndpoints } from '../../constants/endpoints';
import { CreateFeedbackDto } from '../../../modules/feedback/dto';

export function ApiCreateFeedbackForm() {
  return applyDecorators(
    ApiTags(feedbackEndpoints.default),
    ApiOperation({ summary: 'Создать новое обращение' }),
    ApiBody({ type: CreateFeedbackDto }),
  );
}
