import { PartialType } from '@nestjs/mapped-types';
import { DtoCreateUser } from './dto.create.user';

export class DtoUpdateUser extends PartialType(DtoCreateUser) {}
