type typeRole = 'INTERN' | 'ENGINEER' | 'ADMIN';
export class DtoCreateUser {
  name: string;
  email: string;
  role: typeRole;
}
