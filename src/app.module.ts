import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './libs/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
