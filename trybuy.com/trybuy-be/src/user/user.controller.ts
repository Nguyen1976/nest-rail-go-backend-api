import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { Request } from 'express';

// Extend Express Request interface to include 'user'
declare module 'express' {
  interface Request {
    user?: User;
  }
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  @UseGuards(JwtAuthGuard) 
  getProfile(@Req() req: Request): User {
    const user = req.user as User;
    return user;
  }
}
