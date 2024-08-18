// src/common/dto/pagination.dto.ts
import { DatabaseService } from '../database/database.service';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  page: number;
  pageSize: number;
}

// src/common/dto/pagination-response.dto.ts
export class PaginationResponseDto<T> {
  data?: T[];
  count: number;
  page: number;
  pageSize: number;
}
export const PaginationResponse = async ({
  pageSize = 10,
  page = 1,
}: {
  pageSize?: number;
  page?: number;
}) => {
  const employeesService = new DatabaseService();
  const [data, total] = await Promise.all([
    employeesService.employee.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
    }),
    employeesService.employee.count(),
  ]);
  return {
    data,
    count: total,
    page,
    pageSize,
  };
};
export class DynamicPaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  filter?: Record<string, any>; // Add more specific filters if needed

  @IsOptional()
  sort?: string; // e.g., 'createdAt:desc', 'name:asc'
}
