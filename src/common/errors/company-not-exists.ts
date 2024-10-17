import { CommonException } from '../interfaces/errors/common-exception';

export class CompanyNotExists extends Error implements CommonException {
  readonly code: string = 'company_not_exists';

  constructor(message?: string) {
    const defaultMessage = 'Company not exists';
    super(message ?? defaultMessage);
  }
}
