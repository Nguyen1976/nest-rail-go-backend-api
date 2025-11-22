import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { RegisterDto } from './dto/register.dto.';
import { RegisterUserVo } from './vo/register-user.vo';
import { SendOtpDto } from './dto/send-otp.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<{ message: string }> {
    return this.authService.sendRegistrationOtp(sendOtpDto.email);
  }

  @Post("register")
  async register(@Body() register: RegisterDto): Promise<RegisterUserVo> {
    return this.authService.register(register)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}

