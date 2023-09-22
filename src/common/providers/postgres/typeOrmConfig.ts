import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../constants';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.configService.get(envConstant.dbHost),
      port: this.configService.get(envConstant.dbPort),
      username: this.configService.get(envConstant.dbUser),
      password: this.configService.get(envConstant.dbPassword),
      database: this.configService.get(envConstant.dbName),
      synchronize: false,
    };
  }
}
