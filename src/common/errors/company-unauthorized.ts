import { CommonException } from '../interfaces/errors/common-exception';

export class CompanyUnauthorized extends Error implements CommonException {
  readonly code: string = 'company_unauthorized';

  constructor(message?: string) {
    const defaultMessage = "User isn't authorized to access this company";
    super(message ?? defaultMessage);
  }
}
