import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { MyLoggerService } from '../my-logger/my-logger.service';
import { EmployeesController } from '../employees/employees.controller';
import { JwtService } from '@nestjs/jwt';
import { DtoLogin } from './dto/dto.login';
import { $encrytToPassword } from '../utils/encrytPassword';
import { DtoCreateEmployee } from '../employees/dto/dto.create.employee';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new MyLoggerService(EmployeesController.name);
  async signIn(dtoLogin: DtoLogin): Promise<{ access_token: string }> {
    const user = await this.employeesService.findByEmail(dtoLogin.email);
    if (
      !user ||
      !(await $encrytToPassword(
        dtoLogin.password,
        (user as DtoCreateEmployee)?.password,
      ))
    ) {
      throw new UnauthorizedException();
    } else {
      const payload = {
        sub: (user as { id: number })?.id,
        email: (user as DtoCreateEmployee)?.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
  async signUp(createEmployeeDto: DtoCreateEmployee) {
    return await this.employeesService.create(createEmployeeDto);
  }
}
