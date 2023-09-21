import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { feedbackEndpoints } from '../../constants/endpoints';

export function ApiCreateFeedbackForm() {
  return applyDecorators(
    ApiTags(feedbackEndpoints.default),
    ApiOperation({ summary: 'Create new feedback' }),
  );
}
