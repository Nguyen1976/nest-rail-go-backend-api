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
  UploadedFiles,
  Query,
  Res,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { storage } from './oss'
import * as path from 'path'
import * as fs from 'fs'
import { MyLoggerDev } from 'src/logger/my.logger.dev'
import { MyLogger } from 'src/logger/my.logger'

@Controller('user')
export class UserController {
  // private logger: MyLoggerDev

  private logger = new MyLogger()
  constructor(private readonly userService: UserService) {}

  @Post('log')
  log(@Body() body) {
    console.log('body ->>> ', body)
  }

  //merge file
  @Get('merge/file')
  mergeFile(@Query('file') fileName: string, @Res() res) {
    const nameDir = 'uploads/' + fileName
    //read
    const files = fs.readdirSync(nameDir)

    let startPos = 0,
      countFile = 0

    files.map((file) => {
      //get path full
      const filePath = nameDir + '/' + file
      console.log('filePath ->>> ', filePath)
      const streamFile = fs.createReadStream(filePath)
      streamFile
        .pipe(
          fs.createWriteStream('uploads/merge/' + fileName, {
            start: startPos,
          }),
        )
        .on('finish', () => {
          countFile++
          if (files.length === countFile) {
          }
          fs.rm(
            nameDir,
            {
              recursive: true,
            },
            () => {},
          )
        })

      startPos += fs.statSync(filePath).size
    })

    return res.json({
      link: `http://localhost:3000/uploads/merge/${fileName}`,
      fileName,
    })
  }

  @Post('upload/large-file')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: 'uploads',
    }),
  )
  uploadLargeFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: { name: string },
  ) {
    console.log('Body ->>> ', body)
    console.log('files ->>> ', files)

    const fileName = body.name.match(/(.+)-\d+$/)?.[1] ?? body.name

    const nameDir = 'uploads/chunks-' + fileName

    //2 mkdir
    if (!fs.existsSync(nameDir)) {
      fs.mkdirSync(nameDir)
    }

    fs.cpSync(files[0].path, nameDir + '/' + body.name)

    fs.rmSync(files[0].path)
  }

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
