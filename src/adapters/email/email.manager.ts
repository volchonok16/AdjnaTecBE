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
      <p>Телефон: ${payload.phone}</p>
      <p>Почта: ${payload.mail}</p>
      <p>Комментарий: ${payload.comment}</p>
    `;
    this.emailAdapters.sendEmail(subject, message);
    return;
  }
}
