import { Injectable } from '@nestjs/common';
import { CreateCompanyDTO } from './dtos/create-company-dto';
import { CompanyRepository } from 'src/common/interfaces/repositories/company-repository';
import { CompanyMemberRepository } from 'src/common/interfaces/repositories/company-member-repository';
import { CompanyAddressRepository } from 'src/common/interfaces/repositories/company-address-repository';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepo: CompanyRepository,
    private readonly memberRepo: CompanyMemberRepository,
    private readonly addressRepo: CompanyAddressRepository,
  ) {}
  async createCompany(args: CreateCompanyDTO, userId: string) {
    const company = await this.companyRepo.create({
      name: args.name,
      address: args.address,
      brandColor: args.brandColor,
      email: args.email,
      phone: args.phone,
    });
    await Promise.all([
      this.memberRepo.create(userId, company.id, 'owner'),
      this.addressRepo.create(company.id, args.address),
    ]);
    return company;
  }
}
