import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string; // Có thể là username hoặc email

  @IsNotEmpty()
  @IsString()
  password: string;
}