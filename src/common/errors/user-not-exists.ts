import { CommonException } from '../interfaces/errors/common-exception';

export class UserNotExists extends Error implements CommonException {
  readonly code: string = 'user_not_exists';

  constructor(message?: string) {
    const defaultMessage = 'User not exists';
    super(message ?? defaultMessage);
  }
}
