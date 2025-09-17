import { Controller, Ip, Post, Req } from '@nestjs/common';
import { SessionService } from './session.service';
import { Request } from 'express';

@Controller({
  path: 'sessions',
})
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('create')
  async createSession() {
    console.log({
      userAgent: 'kkk',
    });
  }
}
