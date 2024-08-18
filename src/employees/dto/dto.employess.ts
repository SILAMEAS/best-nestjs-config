import { enumRole } from './dto.create.employee';

export interface IEmployees {
  name: string;
  username: string;
  email: string;
  role: enumRole;
}
