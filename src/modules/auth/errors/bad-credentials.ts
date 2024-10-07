import { CommonException } from 'src/common/interfaces/errors/common-exception';

export class BadCredentials extends Error implements CommonException {
  readonly code: string = 'bad_credentials';

  constructor(message?: string) {
    const defaultMessage = 'Bad credentials provided';
    super(message ?? defaultMessage);
  }
}
