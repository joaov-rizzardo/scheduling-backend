import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from 'src/common/interfaces/repositories/user-repository';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import { CompanyRepository } from 'src/common/interfaces/repositories/company-repository';
import { PrismaCompanyRepository } from './repositories/prisma-company-repository';
import { CompanyMemberRepository } from 'src/common/interfaces/repositories/company-member-repository';
import { PrismaCompanyMemberRepository } from './repositories/prisma-company-member-repository';
import { CompanyAddressRepository } from 'src/common/interfaces/repositories/company-address-repository';
import { PrismaCompanyAddressRepository } from './repositories/prisma-company-address-repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
    {
      provide: CompanyMemberRepository,
      useClass: PrismaCompanyMemberRepository,
    },
    {
      provide: CompanyAddressRepository,
      useClass: PrismaCompanyAddressRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    CompanyRepository,
    CompanyMemberRepository,
    CompanyAddressRepository,
  ],
})
export class PrismaModule {}
