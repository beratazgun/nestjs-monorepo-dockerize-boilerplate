import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { bold } from 'cli-color';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
      .then(() => {
        Logger.log(
          bold.whiteBright('🎉 --> Prisma connection success'),
          bold.whiteBright('PrismaService'),
        );
      })
      .catch(() => {
        Logger.error(
          bold.redBright('❌ --> Prisma connection failed'),
          bold.redBright('PrismaService'),
        );
      });
  }
}
