import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}
  getHello() {
    return 'Hello from Gateway!';
  }

  async register() {
    return await firstValueFrom(this.client.send('user.register', {}));
  }
}
