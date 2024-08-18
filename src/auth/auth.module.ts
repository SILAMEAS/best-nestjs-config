import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [EmployeesModule],
})
export class AuthModule {}
