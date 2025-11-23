import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendUserVerification(email: string, otp: string): Promise<void> {
    this.logger.log(`Attempting to send verification OTP to ${email}`);
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Mã xác thực đăng ký tài khoản TRYBUY',
        template: './verification', // no need .pub
        context: {
          otp,
        },
      });

      this.logger.log(`Verification OTP sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${email}`, error);
      throw new InternalServerErrorException(
        'Could not send verification email. Please try again later.',
      );
    }
  }
}
