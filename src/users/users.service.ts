import { Injectable, NotFoundException } from '@nestjs/common';
import { DtoUpdateUser } from './dto/dto.update.user';
import { DtoCreateUser, enumRole } from './dto/dto.create.user';

@Injectable()
export class UsersService {
  private tempUsers: any = [
    {
      id: 1,
      username: 'Leanne Granham',
      password: '123',
      email: 'Sincere@aprill.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      username: 'Ervin Howll',
      password: '123',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      username: 'Clementine Bauch',
      password: '123',
      email: 'D@aprill.biz',
      role: 'ADMIN',
    },
    {
      id: 4,
      username: 'Sila',
      password: '123',
      email: 'sila.meas@allweb.com.kh',
      role: 'ADMIN',
    },
    {
      id: 5,
      username: 'Engineer',
      password: '123',
      email: 'egnineer@allweb.com.kh',
      role: 'ENGINEER',
    },
  ];
  findAll(role?: enumRole) {
    if (role) {
      const roleFoundInUser = this.tempUsers.filter(
        (user) => user.role == role,
      );
      if (![enumRole.ADMIN, enumRole.INTERN, enumRole.ENGINEER].includes(role))
        throw new NotFoundException('User Role Not Found');
      if (roleFoundInUser.length == 0) return [];
      return roleFoundInUser;
    }
    return this.tempUsers;
  }
  findOne(id: number) {
    const foundUser = this.tempUsers.find((i) => i.id == id);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }
  findByUsername(username: string) {
    const foundUser = this.tempUsers.find((i) => i.username == username);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }
  create(dtoCreateUser: DtoCreateUser) {
    const userSortId = [...this.tempUsers].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userSortId[0].id + 1,
      ...dtoCreateUser,
    };

    this.tempUsers.push(newUser);
    return newUser;
  }
  update(id: number, dtoUpdateUser: DtoUpdateUser) {
    this.tempUsers = this.tempUsers.map((user) => {
      if (user.id == id) {
        return { ...user, ...dtoUpdateUser };
      } else return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const userRemove = this.findOne(id);
    this.tempUsers = this.tempUsers.filter((i) => i.id != id);
    return userRemove;
  }
}
