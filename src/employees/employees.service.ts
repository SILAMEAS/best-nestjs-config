import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { enumRole } from '../users/dto/dto.create.user';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: enumRole) {
    if (role) {
      if (![enumRole.ADMIN, enumRole.INTERN, enumRole.ENGINEER].includes(role))
        throw new NotFoundException(`${role} : not found in user role`);
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      data: updateEmployeeDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: { id },
    });
  }
}
