import { CommonException } from '../interfaces/errors/common-exception';

export class InvalidAccessToken extends Error implements CommonException {
  readonly code: string = 'invalid_access_token';

  constructor(message?: string) {
    const defaultMessage = 'The token provided is invalid';
    super(message ?? defaultMessage);
  }
}
