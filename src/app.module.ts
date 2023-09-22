import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ApiModule } from './modules/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './common/providers/postgres/typeOrmConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    ApiModule,
  ],
})
export class AppModule {}
