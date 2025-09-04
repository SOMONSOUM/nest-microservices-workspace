import { CreateUserDto } from '@app/common/dto';
import { USER_PATTERN } from '@app/common/patterns';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async register(data: CreateUserDto) {
    return firstValueFrom(this.client.send(USER_PATTERN.CREATE, data));
  }
}
