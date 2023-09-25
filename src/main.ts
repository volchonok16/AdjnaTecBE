import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { appInit, getBaseUrl } from './common/feature';
import { swaggerInit } from './common/swagger/swagger.init';
import { envConstant } from './common/constants';
import { swaggerEndpoint } from './common/constants/endpoints';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appInit(app);
  swaggerInit(app);

  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.get(envConstant.appPort);
  const baseUrl = getBaseUrl(appConfigService);

  await app.listen(port, () => {
    Logger.log(
      `Swagger documentation on ${baseUrl}/${swaggerEndpoint}`,
      'main',
    );
  });
}
bootstrap();
