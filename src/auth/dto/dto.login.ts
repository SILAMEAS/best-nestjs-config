import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DtoLogin {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
