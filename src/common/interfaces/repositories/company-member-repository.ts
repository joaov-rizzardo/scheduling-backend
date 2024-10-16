import { CompanyMember, MemberRole } from 'src/entities/company-member';

export abstract class CompanyMemberRepository {
  abstract create(
    userId: string,
    companyId: string,
    role: MemberRole,
  ): CompanyMember | Promise<CompanyMember>;
}
