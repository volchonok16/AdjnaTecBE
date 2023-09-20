import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { appInit } from './app.init';
import { swaggerInit } from './common/swagger/swagger.init';

async function bootstrap() {
  const port = 5000;
  const app = await NestFactory.create(AppModule);
  appInit(app);
  swaggerInit(app);
  await app.listen(port, () => {
    Logger.log(
      `Swagger documentation on http://localhost:${port}/dock`,
      'main',
    );
  });
}
bootstrap();
