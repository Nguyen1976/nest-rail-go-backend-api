import { HttpException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { RegisterUserDto } from './dto/register-user'
import { createHash } from 'crypto'
import { LoginUserDto } from './dto/login-user'
import { LoginUserVo } from './vo/login-user.view'
import { JwtService } from '@nestjs/jwt'

function md5(input: string): string {
  return createHash('md5').update(input).digest('hex')
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  @Inject(JwtService)
  private readonly jwtService: JwtService

  async register(registerUserDto: RegisterUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: registerUserDto.username },
    })
    if (existingUser) {
      throw new HttpException('Username already exists', 200)
    }

    const newUser = new User()
    newUser.username = registerUserDto.username
    newUser.password = md5(registerUserDto.password)
    newUser.email = registerUserDto.email

    try {
      await this.userRepository.save(newUser)
    } catch (error) {
      throw new HttpException('Error saving error', 500)
    }

    return 'OK'
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserVo> {
    const user = await this.userRepository.findOne({
      where: {
        username: loginUserDto.username,
        password: md5(loginUserDto.password),
      },
    })

    if (!user) {
      throw new HttpException('Invalid username or password', 401)
    }

    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
      iat: Math.floor(Date.now() / 1000),
    })

    const userVo = new LoginUserVo()
    userVo.elements = {
      user,
      token,
    }
    return userVo
  }

  async getPermissionsByUserId(userId: number): Promise<string[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['permissions'],
    })

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    return user.permissions.map((permission) => permission.name)
  }
}
