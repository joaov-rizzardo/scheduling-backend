import { Controller, Get } from '@nestjs/common';
import { CompanyMemberService } from '../services/company-member.service';

@Controller('company/member')
export class CompanyMemberController {
  constructor(private readonly service: CompanyMemberService) {}
}
