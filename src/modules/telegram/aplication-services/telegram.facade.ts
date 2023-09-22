import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegistrationUserCommand } from './commands';
import { TelegramUserDto } from '../dto/telegram-user.dto';

@Injectable()
export class TelegramFacade {
  constructor(private readonly commandBus: CommandBus) {}

  commands = {
    registrationUser: (dto: TelegramUserDto) => this.registrationUser(dto),
  };

  private async registrationUser(dto: TelegramUserDto): Promise<boolean> {
    const command = new RegistrationUserCommand(dto);
    return this.commandBus.execute(command);
  }
}
