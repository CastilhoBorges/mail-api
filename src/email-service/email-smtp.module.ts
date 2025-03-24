import { Module } from '@nestjs/common';
import { EmailSmtpService } from './email-smtp.service';
import { EmailSmtpController } from './email-smtp.controller';

@Module({
  controllers: [EmailSmtpController],
  providers: [EmailSmtpService],
})
export class EmailSmtpModule {}
