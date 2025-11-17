import { Controller, Get, Post, Body, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user'
import { LoginUserDto } from './dto/login-user'
import { LoginUserVo } from './vo/login-user.view'
import { LoginGuard } from 'src/login.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserVo> {
    const user = await this.userService.login(loginUserDto)
    return user
  }

  @Get('profile')
  @UseGuards(LoginGuard)
  async getProfile(@Req() req: Request) {
    return req['user']
  }
}
