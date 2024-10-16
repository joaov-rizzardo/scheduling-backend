import { CompanyMemberRepository } from 'src/common/interfaces/repositories/company-member-repository';
import { MemberRole, CompanyMember } from 'src/entities/company-member';
import { PrismaService } from '../prisma.service';
import { CompanyMember as PrismaCompanyMember } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCompanyMemberRepository implements CompanyMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    companyId: string,
    role: MemberRole,
  ): Promise<CompanyMember> {
    const result = await this.prisma.companyMember.create({
      data: {
        role,
        user_id: userId,
        company_id: companyId,
      },
    });
    return this.instanceCompanyMember(result);
  }

  private instanceCompanyMember(data: PrismaCompanyMember): CompanyMember {
    return new CompanyMember({
      companyId: data.company_id,
      role: data.role,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }
}
