import { Injectable } from '@nestjs/common';
import { EmailAdapters } from './email.adapter';
import { CreateFeedbackDto } from '../../modules/feedback/dto/create-feedback.dto';

@Injectable()
export class EmailManager {
  constructor(protected emailAdapters: EmailAdapters) {}

  async sendFeedbackEmail(payload: CreateFeedbackDto): Promise<any> {
    const subject = 'Создана новое обращение';
    const message = `
      <h1>Пользователь ${payload.name} оставил обращение</h1>
      <p>
        Контактные данные: ${payload.contacts}
        Комментарий: ${payload.comment}
      </p>
    `;

    return await this.emailAdapters.sendEmail(subject, message);
  }
}
