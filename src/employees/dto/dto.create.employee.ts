import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum enumRole {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}
export class DtoCreateUser {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsEnum(enumRole, {
    message: 'Valid role required',
  })
  role: enumRole;
}
