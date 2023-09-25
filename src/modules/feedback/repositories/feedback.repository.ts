import { Injectable } from '@nestjs/common';
import { FeedbackFormEntity } from '../../../common/providers/postgres/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectRepository(FeedbackFormEntity)
    private readonly feedbackRepository: Repository<FeedbackFormEntity>,
  ) {}

  async createFeedback(dto: Partial<FeedbackFormEntity>) {
    return this.feedbackRepository.save(dto);
  }
}
