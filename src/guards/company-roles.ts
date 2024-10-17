import { SetMetadata } from '@nestjs/common';
import { MemberRole } from 'src/entities/company-member';

export const CompanyRoles = (roles: MemberRole[]) =>
  SetMetadata('company-roles', roles);
