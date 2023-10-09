import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerEndpoint } from '../constants/endpoints';
import { FeedbackModule } from '../../modules/feedback/feedback.module';
import { DocumentModule } from '../../modules/documents/document.module';
import { ApiModule } from '../../modules/api.module';
import { AppModule } from '../../app.module';

export const swaggerInit = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .addCookieAuth('refreshToken')
    .setTitle('AdjinaTech')
    .setDescription('AdjinaTech API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [DocumentModule, FeedbackModule],
  });
  SwaggerModule.setup(swaggerEndpoint, app, document);
};
