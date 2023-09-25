import { envConstant } from '../constants';
import { Environment } from '../enums';
import { AppConfigService } from '../../config/app-config.service';

export const getBaseUrl = (configService: AppConfigService): string => {
  const environment = configService.get(envConstant.nodeEnv);

  if (environment === Environment.Production) {
    return configService.get(envConstant.appBaseUrl);
  }

  const port = configService.get(envConstant.appPort);
  return `http://localhost:${port}`;
};
