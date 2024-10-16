import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SetupModule } from './modules/setup/setup.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [SetupModule, PrismaModule, AuthModule, UserModule, CompanyModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
