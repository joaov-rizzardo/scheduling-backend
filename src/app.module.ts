import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SetupModule } from './modules/setup/setup.module';

@Module({
  imports: [SetupModule, PrismaModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
