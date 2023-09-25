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

  async getClients(pageNumber: number) {
    return this.feedbackRepository.find({
      where: { updatedAt: null },
      skip: pageNumber,
      take: 5,
    });
  }
}
