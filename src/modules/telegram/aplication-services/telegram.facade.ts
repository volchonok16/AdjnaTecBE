import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistrationUserCommand } from './commands';
import { TelegramUserDto } from '../dto';
import { GetClientsQuery } from './queries';

@Injectable()
export class TelegramFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  commands = {
    registrationUser: (dto: TelegramUserDto) => this.registrationUser(dto),
  };

  queries = {
    getClients: () => this.getClients(),
  };

  private async registrationUser(dto: TelegramUserDto): Promise<boolean> {
    const command = new RegistrationUserCommand(dto);
    return this.commandBus.execute(command);
  }

  private async getClients() {
    const query = new GetClientsQuery();
    return this.queryBus.execute(query);
  }
}
