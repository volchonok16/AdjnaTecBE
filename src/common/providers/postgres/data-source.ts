import { DataSource } from 'typeorm';
import { envConstant } from '../../constants';
import { config } from 'dotenv';
import { FeedbackFormEntity, TelegramUserEntity } from './entities';
import { Environment } from '../../enums';
import { DocumentEntity } from './entities/document.entity';

config();

const environment = process.env[envConstant.nodeEnv];

export default new DataSource({
  type: 'postgres',
  host: process.env[
    environment === Environment.Production
      ? envConstant.dbHost
      : envConstant.testDbHost
  ],
  port: Number(
    process.env[
      environment === Environment.Production
        ? envConstant.dbPort
        : envConstant.testDbPort
    ],
  ),
  username:
    process.env[
      environment === Environment.Production
        ? envConstant.dbUser
        : envConstant.testDbUser
    ],
  password:
    process.env[
      environment === Environment.Production
        ? envConstant.dbPassword
        : envConstant.testDbPassword
    ],
  database:
    process.env[
      environment === Environment.Production
        ? envConstant.dbName
        : envConstant.testDbName
    ],
  entities: [FeedbackFormEntity, TelegramUserEntity, DocumentEntity],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
