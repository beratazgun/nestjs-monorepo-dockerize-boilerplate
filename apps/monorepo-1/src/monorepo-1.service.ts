import { Injectable } from '@nestjs/common';

@Injectable()
export class Monorepo1Service {
  async getHello() {
    return 'Hello World!';
  }
}
