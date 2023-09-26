import { ConfigService } from '@nestjs/config';
import { envConstant } from '../constants';
import { Environment } from '../enums';

export const getBaseUrl = (configService: ConfigService): string => {
  const environment = configService.get(envConstant.nodeEnv);
  const port = configService.get(envConstant.appPort);

  if (environment === Environment.Production) {
    const baseUrl = configService.get(envConstant.appBaseUrl);
    return `${baseUrl}`;
  }

  return `http://localhost`;
};
