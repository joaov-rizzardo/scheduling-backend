import { CommonException } from 'src/common/interfaces/errors/common-exception';

export class UserEmailAlreadyUsed extends Error implements CommonException {
  readonly code: string = 'user_email_already_used';

  constructor(message?: string) {
    const defaultMessage = 'Email is already used';
    super(message ?? defaultMessage);
  }
}
