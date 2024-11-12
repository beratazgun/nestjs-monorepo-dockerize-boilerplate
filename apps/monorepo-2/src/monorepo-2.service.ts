import { Injectable } from '@nestjs/common';

@Injectable()
export class Monorepo2Service {
  getHello(): string {
    return 'Hello World!';
  }
}
