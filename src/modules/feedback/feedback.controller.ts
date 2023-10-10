import { Body, Controller, Get, Post } from '@nestjs/common';
import { feedbackEndpoints } from '../../common/constants/endpoints';
import { ApiCreateFeedbackForm } from '../../common/swagger/feedback-swagger-decorators';
import { CreateFeedbackDto } from './dto';
import { FeedbackFacade } from './application-services';

@Controller(feedbackEndpoints.default)
export class FeedbackController {
  constructor(private readonly feedbackFacade: FeedbackFacade) {}

  @Post()
  @ApiCreateFeedbackForm()
  async createFeedback(@Body() dto: CreateFeedbackDto): Promise<boolean> {
    return this.feedbackFacade.commands.createFeedback(dto);
  }
}
