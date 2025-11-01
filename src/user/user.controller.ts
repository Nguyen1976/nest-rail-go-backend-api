import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { storage } from './oss'
import * as path from 'path'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //for upload avatar
  @Post('upload/avt')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage: storage,
      limits: {
        fileSize: 5 * 1024 * 1024, //5MB
      },
      fileFilter(req, file, cb) {
        //extName
        const extName = path.extname(file.originalname)
        if (['.jpg', '.png', '.gif'].includes(extName)) {
          return cb(null, true)
        } else {
          cb(new BadRequestException('Upload file error'), false)
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Upload file ->>> ', file)
    return file.path
  }

  @Post('new')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto)
  }

  @Post('login')
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.userService.login(LoginUserDto)
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
