import { Controller, Get } from '@nestjs/common';
import { Monorepo2Service } from './monorepo-2.service';

@Controller()
export class Monorepo2Controller {
  constructor(private readonly monorepo2Service: Monorepo2Service) {}

  @Get()
  getHello(): string {
    return this.monorepo2Service.getHello();
  }
}
