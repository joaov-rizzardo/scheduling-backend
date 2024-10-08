import { CommonException } from '../interfaces/errors/common-exception';

export class UserUnauthorized extends Error implements CommonException {
  readonly code: string = 'user_unauthorized';

  constructor(message?: string) {
    const defaultMessage = "User isn't authorized to access this resource";
    super(message ?? defaultMessage);
  }
}
