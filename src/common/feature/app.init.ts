import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { useContainer } from 'class-validator';
import { ExceptionsFilter } from '../exeptions/exeption.filter';

export const appInit = (app: INestApplication) => {
  const options = {
    origin: ['http://adjnatech.ru', 'http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization',
    ],
  };
  app.enableCors(options);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new ExceptionsFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
