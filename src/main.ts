import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { appInit, getBaseUrl } from './common/feature';
import { swaggerInit } from './common/swagger/swagger.init';
import { ConfigService } from '@nestjs/config';
import { envConstant } from './common/constants';
import { swaggerEndpoint } from './common/constants/endpoints';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appInit(app);
  swaggerInit(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(envConstant.appPort);
  const baseUrl = getBaseUrl(configService);

  await app.listen(port, () => {
    Logger.log(
      `Swagger documentation on ${baseUrl}:${port}/${swaggerEndpoint}`,
      'main',
    );
  });
}
bootstrap();
