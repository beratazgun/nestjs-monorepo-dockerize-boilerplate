import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${
        process.env.NODE_ENV === 'development'
          ? '/config/.env.development'
          : `/config/.env.production`
      }`,
    }),
    PrismaModule,
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
