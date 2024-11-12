import { Module } from '@nestjs/common';
import { Monorepo2Controller } from './monorepo-2.controller';
import { Monorepo2Service } from './monorepo-2.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  controllers: [Monorepo2Controller],
  providers: [Monorepo2Service],
})
export class Monorepo2Module {}
