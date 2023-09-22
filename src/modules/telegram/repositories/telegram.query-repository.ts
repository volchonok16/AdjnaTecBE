import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramUserEntity } from '../../../common/providers/postgres/entities/telegram-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TelegramQueryRepository {
  constructor(
    @InjectRepository(TelegramUserEntity)
    private readonly feedbackRepository: Repository<TelegramUserEntity>,
  ) {}

  async userExists(userId: number): Promise<boolean> {
    const res = await this.feedbackRepository.exist({ where: { id: userId } });
    console.log(res, 'q');
    return res;
  }
}
