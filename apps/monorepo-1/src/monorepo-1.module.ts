import { Module } from '@nestjs/common';
import { Monorepo1Controller } from './monorepo-1.controller';
import { Monorepo1Service } from './monorepo-1.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  controllers: [Monorepo1Controller],
  providers: [Monorepo1Service],
})
export class Monorepo1Module {}
