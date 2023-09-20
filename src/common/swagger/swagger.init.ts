import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../../app.module';

export const swaggerInit = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .addCookieAuth('refreshToken')
    .setTitle('Feedback form')
    .setDescription('Feedback form API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [AppModule],
  });
  SwaggerModule.setup('dock', app, document);
};
