import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { appInit } from './app.init';
import { swaggerInit } from './common/swagger/swagger.init';
import { getBaseUrl } from './common/feature';
import { ConfigService } from '@nestjs/config';
import { endpoints, envConstant } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appInit(app);
  swaggerInit(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(envConstant.port);
  const baseUrl = getBaseUrl(configService);

  await app.listen(port, () => {
    Logger.log(
      `Swagger documentation on ${baseUrl}/${endpoints.swagger}`,
      'main',
    );
  });
}
bootstrap();
