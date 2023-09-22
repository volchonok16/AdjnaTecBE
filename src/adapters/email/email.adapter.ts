import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envConstant } from '../../common/constants';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailAdapters {
  private readonly logger = new Logger(EmailAdapters.name);
  private readonly contactEmail: string;
  private readonly transportConfig;

  constructor(private readonly configService: ConfigService) {
    this.contactEmail = this.configService.get(envConstant.contactEmail);
    this.transportConfig = {
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
    try {
      const transport = await nodemailer.createTransport(this.transportConfig);

      await transport.sendMail({
        from: 'AdjnaTech <mail>',
        to: this.contactEmail,
        subject: subject,
        html: message,
      });

      this.logger.log('Email sent successfully');
      return;
    } catch (e) {
      this.logger.error(`Email sending error: ${e}`);
    }
  }
}
