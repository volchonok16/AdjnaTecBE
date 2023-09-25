import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ApiModule } from './modules/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './common/providers/postgres/typeOrmConfig';
import { AppConfigService } from './config/app-config.service';

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
  providers: [AppConfigService],
})
export class AppModule {}
