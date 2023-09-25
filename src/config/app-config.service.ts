import { IConfigService } from './config.interface';
import { ConfigService } from '@nestjs/config';
import { config, DotenvParseOutput } from 'dotenv';
import { Logger } from '@nestjs/common';

export class AppConfigService implements IConfigService {
  private logger = new Logger(AppConfigService.name);
  private readonly config: DotenvParseOutput;

  constructor(private readonly configService: ConfigService) {
    const { error, parsed } = config();
    if (error) throw new Error('.env file not found');
    if (!parsed) throw new Error('Empty .env file');
    this.config = parsed;
  }

  get(key: string): string {
    const result = this.config[key];
    if (!result) this.logger.error(`Field ${key} not found`);
    return result;
  }
}
