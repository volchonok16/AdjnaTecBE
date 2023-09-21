import { Body, Controller, Post } from '@nestjs/common';
import { feedbackEndpoints } from '../../common/constants/endpoints';
import { ApiCreateFeedbackForm } from '../../common/swagger/feedback-swagger-decorators';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackFacade } from './application-services';

@Controller(feedbackEndpoints.default)
export class FeedbackController {
  constructor(private readonly feedbackFacade: FeedbackFacade) {}

  @Post()
  @ApiCreateFeedbackForm()
  async createFeedback(@Body() dto: CreateFeedbackDto): Promise<boolean> {
    await this.feedbackFacade.commands.createFeedback(dto);
    return true;
  }
}
