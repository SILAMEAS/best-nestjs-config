import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { enumRole } from '../users/dto/dto.create.user';
import { DtoCreateEmployee } from './dto/dto.create.employee';
import { DtoUpdateEmployee } from './dto/dto.update.employee';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MyLoggerService } from '../my-logger/my-logger.service';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  private readonly logger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body(ValidationPipe) createEmployeeDto: DtoCreateEmployee) {
    return this.employeesService.create(createEmployeeDto);
  }
  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: enumRole) {
    this.logger.log(`Request for All Employees\t${ip}`);
    return this.employeesService.findAll(role);
  }
  /**  1 s allow request 1
   I can write short because have option short and long in app.module
   */
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateEmployeeDto: DtoUpdateEmployee,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(+id);
  }
}
