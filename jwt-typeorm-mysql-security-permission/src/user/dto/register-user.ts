import { IsEmail, isEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class RegisterUserDto {
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters long',
  })
  password: string

  @IsString()
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Invalid email format',
    },
  )
  email: string
}
