import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSmtpModule } from './email-service/email-smtp.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmailSmtpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
