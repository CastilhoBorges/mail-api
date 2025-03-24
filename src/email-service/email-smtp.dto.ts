import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'recipient@example.com',
  })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({
    description: 'Email subject line',
    example: 'Important Notification',
  })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'Plain text body of the email',
    example: 'This is the email content.',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    description: 'HTML body of the email (optional)',
    example: '<p>This is the HTML email content.</p>',
    required: false,
  })
  @IsOptional()
  @IsString()
  html?: string;
}
