import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { MyLoggerService } from '../my-logger/my-logger.service';
import { AuthController } from './auth.controller';
import { EmployeesController } from '../employees/employees.controller';
import { DtoLogin } from './dto/dto.login';

@Injectable()
export class AuthService {
  constructor(private employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name);
  async signIn(dtoLogin: DtoLogin): Promise<any> {
    const user = await this.employeesService
      .findByEmail(dtoLogin.email)
      .then((r) => {
        this.logger.log(r);
        return r;
      });
    if (user?.password !== dtoLogin.password) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}
