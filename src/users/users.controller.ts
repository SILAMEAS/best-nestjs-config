import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { DtoCreateUser, enumRole } from './dto/dto.create.user';
import { DtoUpdateUser } from './dto/dto.update.user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /** GET /users  or /users?role=value&age=value*/
  @Get()
  findAll(@Query('role') role?: enumRole) {
    return this.usersService.findAll(role);
  }
  /** GET /users/interns
   : it must be stayed before of dynamic router like :id because if
   you write it below :id it will think 'interns' is id
   @Get('interns')
    findAllInterns(@Param('id') id: string) {
    return [];
    }
   */
  /** GET /users/:id */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  /** POST /users */
  @Post()
  create(@Body(ValidationPipe) dtoCreateUser: DtoCreateUser) {
    return this.usersService.create(dtoCreateUser);
  }
  /** PATCH /users/:id */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dtoUpdateUser: DtoUpdateUser,
  ) {
    return this.usersService.update(id, dtoUpdateUser);
  }
  /** DELETE /users/:id */
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
