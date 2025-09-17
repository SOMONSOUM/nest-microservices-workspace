import { Controller, Get, Ip, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from '@app/common/dto';
import { USER_PATTERN } from '@app/common/patterns';
import { Request } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('create')
  async createSession(@Req() req: Request, @Ip() ip: string) {
    console.log({
      userAgent: req,
      ip,
    });
  }

  @MessagePattern(USER_PATTERN.CREATE)
  register(@Payload() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @MessagePattern(USER_PATTERN.LOGIN)
  login(@Payload() data: LoginUserDto) {
    return this.userService.login(data);
  }
}
