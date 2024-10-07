import { Injectable } from '@nestjs/common';
import { PasswordEncrypter } from 'src/common/interfaces/cryptography/password-encrypter';
import { UserRepository } from 'src/common/interfaces/repositories/user-repository';
import { BadCredentials } from './errors/bad-credentials';
import { AuthTokenGenerator } from 'src/common/interfaces/cryptography/auth-token-generator';
import { InvalidRefreshToken } from './errors/invalid-refresh-token';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordEncrypter: PasswordEncrypter,
    private readonly authToken: AuthTokenGenerator,
  ) {}

  public async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new BadCredentials();
    if (!(await this.passwordEncrypter.check(password, user.password))) {
      throw new BadCredentials();
    }
    const accessToken = await this.authToken.generateAccessToken(user.id);
    const refreshToken = await this.authToken.generateRefreshToken(user.id);
    return {
      refreshToken,
      accessToken,
    };
  }

  public async refresh(refreshToken: string): Promise<string> {
    if (!(await this.authToken.checkRefreshToken(refreshToken))) {
      throw new InvalidRefreshToken();
    }
    const { userId } = await this.authToken.decodeRefreshToken(refreshToken);
    const accessToken = await this.authToken.generateAccessToken(userId);
    return accessToken;
  }
}
