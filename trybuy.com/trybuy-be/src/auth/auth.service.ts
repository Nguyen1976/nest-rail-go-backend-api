import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto.';
import { RegisterUserVo } from './vo/register-user.vo';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

// NOTES: use Redis, next video.
const otpStorage: Record<string, { otp: string; expires: number }> = {};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  // send otp
  async sendRegistrationOtp(email: string): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // Hết hạn sau 5 phút

    // Lưu OTP
    otpStorage[email] = { otp, expires };

    // Gửi email
    await this.emailService.sendUserVerification(email, otp);

    console.log(`Generated OTP for ${email}: ${otp}`); // Để debug

    return { message: 'OTP has been sent to your email.' };
  }

  async register(registerDto: RegisterDto): Promise<RegisterUserVo> {
    const { email, otp, username, password, nickname } = registerDto;
    // 0. Xác thực OTP
    const storedOtpData = otpStorage[email];
    console.log(otp, otpStorage[email]);
    if (!storedOtpData) {
      throw new BadRequestException(
        'OTP not found or has expired. Please request a new one.',
      );
    }

    console.log(
      storedOtpData.expires,
      Date.now(),
      storedOtpData.expires < Date.now(),
    );

    if (storedOtpData.expires < Date.now()) {
      delete otpStorage[email]; // Xóa OTP hết hạn
      throw new BadRequestException(
        'OTP has expired. Please request a new one.',
      );
    }
    if (storedOtpData.otp !== otp) {
      throw new BadRequestException('Invalid OTP.');
    }
    // 1. check this acc exist in db
    const existingUser = await this.userRepository.findOne({
      where: [{ username: registerDto.username }, { email: registerDto.email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists.');
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 3. new entity
    const newUser = this.userRepository.create({
      username: registerDto.username,
      nickname: registerDto.nickname,
      email: registerDto.email,
      password: hashedPassword,
    });

    try {
      // 4. new user
      const savedUser = await this.userRepository.save(newUser);

      // 5. reponse vo
      const userVo = new RegisterUserVo();
      userVo.id = savedUser.id;
      userVo.username = savedUser.username;
      userVo.nickname = savedUser.nickname;
      userVo.email = savedUser.email;
      userVo.createdAt = savedUser.createdAt;

      return userVo;
    } catch (error) {
      // Handler Error
      throw new InternalServerErrorException(
        'An error occurred while creating the user.',
      );
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    this.logger.log('[User->login] ', loginDto);
    const { username, password } = loginDto;

    // Tìm user bằng username hoặc email
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }],
      // Quan trọng: Phải select cả password để so sánh
      select: ['id', 'username', 'password', 'isActive'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account is inactive.');
    }

    // So sánh mật khẩu
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Tạo JWT payload
    const payload = { username: user.username, sub: user.id };

    // Tạo token
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
