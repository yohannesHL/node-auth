import {
  Body, Controller,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.validateUser(loginAuthDto.userName, loginAuthDto.password);
  }
}
