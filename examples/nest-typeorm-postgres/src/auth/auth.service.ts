import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserName(userName);

    if (user && user.password == password) {
      const { password, ...details } = user;
      return details;
    }

    return null;
  }
}
