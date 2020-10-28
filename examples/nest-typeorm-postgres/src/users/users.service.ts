import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return User.create(createUserDto)
  }

  findAll() {
    return User.find();
  }

  findOne(id: number) {
    return User.findOne(id);
  }

  findOneByUserName(userName: string) {
    return User.findOne({ userName });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return User.update(id, updateUserDto);
  }

  remove(id: number) {
    return User.delete(id);
  }
}
