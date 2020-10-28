import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll(): Promise<User[]>  {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByUserName(userName: string): Promise<User> {
    return this.userRepository.findOne({ userName });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number): void {
    this.userRepository.delete(id);
  }
}
