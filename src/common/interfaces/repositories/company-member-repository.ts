import { CompanyMember, MemberRole } from 'src/entities/company-member';

export abstract class CompanyMemberRepository {
  abstract create(
    userId: string,
    companyId: string,
    role: MemberRole,
  ): CompanyMember | Promise<CompanyMember>;
  abstract findByUser(
    userId: string,
  ): CompanyMember[] | Promise<CompanyMember[]>;
  abstract findMember(
    userId: string,
    companyId: string,
  ): CompanyMember | null | Promise<CompanyMember | null>;
}
