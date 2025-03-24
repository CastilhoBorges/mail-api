import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmailSmtpService } from './email-smtp.service';
import { SendEmailDto } from './email-smtp.dto';

@ApiTags('Email')
@Controller('email')
export class EmailSmtpController {
  constructor(private readonly emailSmtpService: EmailSmtpService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Send an email', 
    description: 'Sends an email using the configured SMTP service' 
  })
  @ApiResponse({
    status: 200,
    description: 'Email sent successfully',
    schema: {
      example: {
        message: 'Email sent successfully'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid email parameters'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Email sending failed'
  })
  async sendEmail(
    @Body() sendEmailDto: SendEmailDto,
  ): Promise<{ message: string }> {
    try {
      await this.emailSmtpService.sendEmail(sendEmailDto);
      return { message: 'Email sent successfully' };
    } catch (error) {
      throw error;
    }
  }
}