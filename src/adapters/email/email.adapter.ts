import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../common/constants';

const nodemailer = require('nodemailer');

@Injectable()
export class EmailAdapters {
  private readonly contactEmail: string;
  private readonly transport;

  constructor(private configService: ConfigService) {
    this.contactEmail = this.configService.get(envConstant.contactEmail);
    this.transport = {
      host: this.configService.get(envConstant.mailboxHost),
      port: this.configService.get(envConstant.mailboxPort),
      secure: false,
      auth: {
        user: this.configService.get(envConstant.mailbox),
        pass: this.configService.get(envConstant.emailPassword),
      },
    };
  }

  async sendEmail(subject: string, message: string): Promise<void> {
    const transport = await nodemailer.createTransport(this.transport);

    await transport.sendMail({
      from: 'AdjnaTech <mail>',
      to: this.contactEmail,
      subject: subject,
      html: message,
    });

    return;
  }
}
