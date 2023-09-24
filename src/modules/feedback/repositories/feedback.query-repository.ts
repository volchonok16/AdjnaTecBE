import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackFormEntity } from '../../../common/providers/postgres/entities/feedback-form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackQueryRepository {
  constructor(
    @InjectRepository(FeedbackFormEntity)
    private readonly feedbackRepository: Repository<FeedbackFormEntity>,
  ) {}

  async getClients() {
    return this.feedbackRepository.find({
      where: { updatedAt: null },
      skip: 0,
      take: 5,
    });
  }
}
