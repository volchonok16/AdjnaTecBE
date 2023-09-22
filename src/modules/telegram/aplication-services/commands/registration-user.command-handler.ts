import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TelegramUserDto } from '../../dto/telegram-user.dto';
import { TelegramRepository } from '../../repositories/telegram.repository';
import { TelegramQueryRepository } from '../../repositories/telegram.query-repository';

export class RegistrationUserCommand {
  constructor(public readonly dto: TelegramUserDto) {}
}

@CommandHandler(RegistrationUserCommand)
export class RegistrationUserCommandHandler
  implements ICommandHandler<RegistrationUserCommand, boolean>
{
  constructor(
    private readonly telegramRepository: TelegramRepository,
    private readonly telegramQueryRepository: TelegramQueryRepository,
  ) {}

  async execute({ dto }: RegistrationUserCommand): Promise<boolean> {
    const isExists = await this.telegramQueryRepository.userExists(dto.id);
    if (!isExists) await this.telegramRepository.registrationUser(dto);

    return true;
  }
}
