import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getHello() {
    return 'Hello from Gateway!';
  }
}
