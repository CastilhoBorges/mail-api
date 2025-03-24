import { Injectable } from '@nestjs/common';
import { Transporter, SentMessageInfo, createTransport } from 'nodemailer';
import { SendEmailDto } from './email-smtp.dto';
import { ENVIRONMENT } from '../common/environment.enum';

@Injectable()
export class EmailSmtpService {
  private transporter: Transporter<SentMessageInfo, any>;

  constructor() {
    this.transporter = createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
    });
  }

  async sendEmail({ from, subject, text, html }: SendEmailDto): Promise<void> {
    const emailSmtp = ENVIRONMENT.DEVELOPMENT.toString()
      ? process.env.EMAIL_SMTP_TO_DEVELOPMENT
      : process.env.EMAIL_SMTP;

    const mailOptions = {
      from: from,
      to: emailSmtp,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}
