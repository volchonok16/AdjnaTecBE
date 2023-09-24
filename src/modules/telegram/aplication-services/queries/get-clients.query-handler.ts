import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FeedbackQueryRepository } from '../../../feedback/repositories/feedback.query-repository';

export class GetClientsQuery {
  constructor() {}
}

@QueryHandler(GetClientsQuery)
export class GetClientsQueryHandler implements IQueryHandler<GetClientsQuery> {
  constructor(private readonly feedbackRepository: FeedbackQueryRepository) {}

  async execute(): Promise<any> {
    return this.feedbackRepository.getClients();
  }
}
