import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelegramUserEntity } from '../../../common/providers/postgres/entities/telegram-user.entity';
import { TelegramUserDto } from '../dto/telegram-user.dto';

@Injectable()
export class TelegramRepository {
  constructor(
    @InjectRepository(TelegramUserEntity)
    private readonly feedbackRepository: Repository<TelegramUserEntity>,
  ) {}

  async registrationUser(dto: TelegramUserDto) {
    return await this.feedbackRepository.save(dto);
  }
}
