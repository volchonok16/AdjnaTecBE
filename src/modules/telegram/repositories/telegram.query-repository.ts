import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramUserEntity } from '../../../common/providers/postgres/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TelegramQueryRepository {
  constructor(
    @InjectRepository(TelegramUserEntity)
    private readonly telegramRepository: Repository<TelegramUserEntity>,
  ) {}

  async userExists(userId: number): Promise<boolean> {
    return await this.telegramRepository.exist({ where: { id: userId } });
  }

  async getRecipients(): Promise<TelegramUserEntity[]> {
    return await this.telegramRepository.find();
  }
}
