import { Injectable } from '@nestjs/common';
import { EmailAdapters } from './email.adapter';
import { CreateFeedbackDto } from '../../modules/feedback/dto/create-feedback.dto';

@Injectable()
export class EmailManager {
  constructor(protected emailAdapters: EmailAdapters) {}

  async sendNotificationEmail(payload: CreateFeedbackDto): Promise<any> {
    const subject = 'Создана новое обращение';
    const message = `
      <h1>Пользователь <b>${payload.name}</b> оставил обращение</h1>
      <hr width="100%" color="red">
      <p>Контактные данные: ${payload.contacts}</p>
      <p>Комментарий: ${payload.comment}</p>
    `;

    return await this.emailAdapters.sendEmail(subject, message);
  }
}
