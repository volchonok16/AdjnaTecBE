import { Injectable, OnModuleInit } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import {
  endpoints,
  envConstant,
  telegramConstant,
} from '../../common/constants';
import { getBaseUrl } from '../../common/feature';

@Injectable()
export class TelegramAdapter implements OnModuleInit {
  private readonly axiosInstance: AxiosInstance;
  private readonly appUrl: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get(envConstant.telegramBotToken);

    this.axiosInstance = axios.create({
      baseURL: telegramConstant.telegramBaseUrl(token),
    });
    this.appUrl = getBaseUrl(configService);
  }

  async onModuleInit() {
    await this.axiosInstance.post(telegramConstant.method.setWebhook, {
      url: `${this.appUrl}/${endpoints.default}/${endpoints.telegram}`,
    });
  }
}
