import { Injectable, OnModuleInit } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { envConstant, telegramConstant } from '../../common/constants';
import { getBaseUrl } from '../../common/feature';
import { telegramEndpoints } from '../../common/constants/endpoints';
import { CreateFeedbackDto } from '../../modules/feedback/dto';
import { getNotificationMessageHelper } from '../../common/feature/get-notification-message.helper';

@Injectable()
export class TelegramAdapter implements OnModuleInit {
  private readonly axiosInstance: AxiosInstance;
  private readonly appUrl: string;
  private readonly botId: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get(envConstant.telegramBotToken);

    this.axiosInstance = axios.create({
      baseURL: telegramConstant.telegramBaseUrl(token),
    });
    this.appUrl = getBaseUrl(configService);
    this.botId = this.configService.get(envConstant.telegramBotId);
    console.log(
      `${this.appUrl}/${telegramEndpoints.default}/${telegramEndpoints.telegram}`,
    );
  }

  async onModuleInit() {
    await this.axiosInstance.post(telegramConstant.method.setWebhook, {
      url: `${this.appUrl}/${telegramEndpoints.default}/${telegramEndpoints.telegram}`,
    });
  }

  async sendNotification(dto: CreateFeedbackDto) {
    await this.axiosInstance.post(telegramConstant.method.sendMessage, {
      chat_id: this.botId,
      text: getNotificationMessageHelper(dto),
    });
  }
}
