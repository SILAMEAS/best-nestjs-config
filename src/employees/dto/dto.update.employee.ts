import { PartialType } from '@nestjs/mapped-types';
import { DtoCreateEmployee } from './dto.create.employee';

export class DtoUpdateEmployee extends PartialType(DtoCreateEmployee) {}
