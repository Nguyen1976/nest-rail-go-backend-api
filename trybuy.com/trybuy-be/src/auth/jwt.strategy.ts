import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Hàm này sẽ được Passport gọi sau khi xác thực token thành công
  async validate(payload: { sub: number; username: string }): Promise<User> {
    const { sub: id } = payload;
    
    // Tìm người dùng trong DB dựa trên ID từ token
    const user = await this.userRepository.findOneBy({ id });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or account is inactive.');
    }
    
    // Passport sẽ tự động đính kèm user này vào `request.user`
    return user;
  }
}