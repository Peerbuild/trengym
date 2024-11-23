import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@trengym/db';

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}