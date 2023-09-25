import { DataSource } from 'typeorm';
import { envConstant } from '../../constants';
import { config } from 'dotenv';
import { FeedbackFormEntity, TelegramUserEntity } from './entities';

config();

console.log(process.env[envConstant.dbUser]);
export default new DataSource({
  type: 'postgres',
  host: process.env[envConstant.dbHost],
  port: Number(process.env[envConstant.dbPort]),
  username: process.env[envConstant.dbUser],
  password: process.env[envConstant.dbPassword],
  database: process.env[envConstant.dbName],
  entities: [FeedbackFormEntity, TelegramUserEntity],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
