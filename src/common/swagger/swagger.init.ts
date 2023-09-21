import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerEndpoint } from '../constants/endpoints';
import { FeedbackModule } from '../../modules/feedback/feedback.module';

export const swaggerInit = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .addCookieAuth('refreshToken')
    .setTitle('Feedback form')
    .setDescription('Feedback form API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [FeedbackModule],
  });
  SwaggerModule.setup(swaggerEndpoint, app, document);
};
