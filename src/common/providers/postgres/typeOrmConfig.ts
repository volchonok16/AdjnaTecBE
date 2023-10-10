import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../constants';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { FeedbackFormEntity } from './entities/feedback-form.entity';
import { TelegramUserEntity } from './entities/telegram-user.entity';
import { Environment } from '../../enums';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  environment: string;
  constructor(private readonly configService: ConfigService) {
    this.environment = this.configService.get(envConstant.nodeEnv);
  }

  createTypeOrmOptions(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.configService.get(
        this.environment === Environment.Production
          ? envConstant.dbHost
          : envConstant.testDbHost,
      ),
      port: this.configService.get(
        this.environment === Environment.Production
          ? envConstant.dbPort
          : envConstant.testDbPort,
      ),
      username: this.configService.get(
        this.environment === Environment.Production
          ? envConstant.dbUser
          : envConstant.testDbUser,
      ),
      password: this.configService.get(
        this.environment === Environment.Production
          ? envConstant.dbPassword
          : envConstant.testDbPassword,
      ),
      database: this.configService.get(
        this.environment === Environment.Production
          ? envConstant.dbName
          : envConstant.testDbName,
      ),
      entities: [FeedbackFormEntity, TelegramUserEntity, DocumentEntity],
      synchronize: false,
    };
  }
}
