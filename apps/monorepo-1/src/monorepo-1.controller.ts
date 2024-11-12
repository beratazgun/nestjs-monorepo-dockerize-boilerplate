import { Controller, Get } from '@nestjs/common';
import { Monorepo1Service } from './monorepo-1.service';

@Controller()
export class Monorepo1Controller {
  constructor(private readonly appService: Monorepo1Service) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
