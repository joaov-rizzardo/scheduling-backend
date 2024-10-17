import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserGuard, UserRequest } from './user.guard';
import { MemberRole } from 'src/entities/company-member';
import { Company } from 'src/entities/company';
import { CompanyRepository } from 'src/common/interfaces/repositories/company-repository';
import { CompanyMemberRepository } from 'src/common/interfaces/repositories/company-member-repository';
import { CompanyNotExists } from 'src/common/errors/company-not-exists';
import { CompanyUnauthorized } from 'src/common/errors/company-unauthorized';
import { Reflector } from '@nestjs/core';

export interface CompanyRequest extends UserRequest {
  company: {
    role: MemberRole;
    data: Company;
  };
}

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(
    private readonly userGuard: UserGuard,
    private readonly companyRepo: CompanyRepository,
    private readonly memberRepo: CompanyMemberRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await this.userGuard.canActivate(context);
      const request = context.switchToHttp().getRequest<CompanyRequest>();
      const companyId = request.headers['x-company'] as string;
      if (!companyId) throw new CompanyNotExists();
      const company = await this.companyRepo.findById(companyId);
      if (!company) throw new CompanyNotExists();
      if (request.user.role === 'admin') {
        request['company'] = {
          role: 'admin',
          data: company,
        };
        return true;
      }
      const member = await this.memberRepo.findMember(
        request.user.id,
        companyId,
      );
      if (!member) throw new CompanyUnauthorized();
      const roles = this.reflector.get<MemberRole[]>(
        'company-roles',
        context.getHandler(),
      );
      if (roles && !roles.includes(member.role)) {
        throw new CompanyUnauthorized();
      }
      request['company'] = {
        role: member.role,
        data: company,
      };
      return true;
    } catch (error) {
      if (error instanceof CompanyNotExists) {
        throw new NotFoundException({
          code: error.code,
          message: error.message,
        });
      }
      if (error instanceof CompanyUnauthorized) {
        throw new UnauthorizedException({
          code: error.code,
          message: error.message,
        });
      }
      throw error;
    }
  }
}
