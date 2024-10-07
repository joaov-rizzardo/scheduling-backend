import { CommonException } from 'src/common/interfaces/errors/common-exception';

export class InvalidRefreshToken extends Error implements CommonException {
  readonly code: string = 'invalid_refresh_token';
  message: string = 'Invalid refresh token provided';

  constructor(message?: string) {
    const defaultMessage = 'Invalid refresh token provided';
    super(message ?? defaultMessage);
  }
}
