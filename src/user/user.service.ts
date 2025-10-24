import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { DbService } from 'src/db/db.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();

    const checkUserExits = users.find(
      (e) => e.accountname === loginUserDto.accountname,
    );

    if (!checkUserExits) {
      throw new BadRequestException(
        `Login in with user ${loginUserDto.accountname} failed`,
      );
    }

    //chack password

    if (checkUserExits.password !== loginUserDto.password) {
      throw new BadRequestException(
        `Login in with user ${loginUserDto.accountname} failed`,
      );
    }

    return checkUserExits;
  }

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();

    const checkUserExits =
      users.filter((e) => e.accountname === registerUserDto.accountname)
        .length > 0;

    if (checkUserExits) {
      throw new BadRequestException(
        `Usser ${registerUserDto.accountname} already`,
      );
    }

    const user = new User();
    user.accountname = registerUserDto.accountname;
    user.password = registerUserDto.password;

    //push
    users.push(user);

    //save file
    await this.dbService.write(users);
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
