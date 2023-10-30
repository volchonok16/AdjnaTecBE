import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../common/constants';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { NecordModule } from 'necord';

@Module({
  imports: [
    CqrsModule,
    NecordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get(envConstant.discordBotToken),
        intents: [],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class DiscordModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit(): any {
    this.commandBus.register();
    this.queryBus.register();
  }
}
