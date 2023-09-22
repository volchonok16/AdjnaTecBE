import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { envConstant, telegramConstant } from '../../common/constants';
import { CreateFeedbackDto } from '../../modules/feedback/dto';
import { getNotificationMessageHelper } from '../../common/feature/get-notification-message.helper';

@Injectable()
export class TelegramAdapter {
  private readonly axiosInstance: AxiosInstance;
  private readonly appUrl: string;
  private readonly botId: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get(envConstant.telegramBotToken);

    this.axiosInstance = axios.create({
      baseURL: telegramConstant.telegramBaseUrl(token),
    });
    this.botId = this.configService.get(envConstant.telegramBotId);
  }

  async sendNotification(dto: CreateFeedbackDto) {
    await this.axiosInstance.post(telegramConstant.method.sendMessage, {
      chat_id: this.botId,
      text: getNotificationMessageHelper(dto),
    });
  }
}
