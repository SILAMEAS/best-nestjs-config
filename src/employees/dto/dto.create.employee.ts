import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum enumRole {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}
export class DtoCreateEmployee {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(enumRole, {
    message: 'Valid role required',
  })
  role: enumRole;
}
