import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/common/dto';

@Controller({
  path: 'users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }
}
