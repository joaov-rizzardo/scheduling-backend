import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyMemberController } from './controllers/company-member.controller';
import { CompanyMemberService } from './services/company-member.service';

@Module({
  controllers: [CompanyController, CompanyMemberController],
  providers: [CompanyService, CompanyMemberService],
})
export class CompanyModule {}
