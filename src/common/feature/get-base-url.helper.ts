import { ConfigService } from '@nestjs/config';
import { envConstant } from '../constants';
import { Environment } from '../enums';

export const getBaseUrl = (configService: ConfigService): string => {
  const environment = configService.get(envConstant.nodeEnv);

  if (environment === Environment.Production) {
    return configService.get(envConstant.appBaseUrl);
  }

  const port = configService.get(envConstant.port);
  return 'https://5542-176-59-57-225.ngrok.io';
  //return `http://localhost:${port}`;
};
