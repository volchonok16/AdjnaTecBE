import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TelegramAdapter } from './adapters/telegram';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
  ],
  controllers: [AppController],
  providers: [TelegramAdapter],
})
export class AppModule {}
