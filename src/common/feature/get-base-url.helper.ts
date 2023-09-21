import { ConfigService } from '@nestjs/config';
import { envConstant } from '../constants';
import { Environment } from '../enums';

export const getBaseUrl = (configService: ConfigService): string => {
  const environment = configService.get(envConstant.nodeEnv);

  if (environment === Environment.Production) {
    return configService.get(envConstant.appBaseUrl);
  }

  const port = configService.get(envConstant.port);
  return 'https://4fb2-176-59-55-105.ngrok.io';
  //return `http://localhost:${port}`;
};
