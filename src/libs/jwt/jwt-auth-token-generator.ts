import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import {
  AccessTokenPayload,
  AuthTokenGenerator,
  RefreshTokenPayload,
} from 'src/common/interfaces/cryptography/auth-token-generator';
import { EnvironmentProvider } from 'src/providers/environment-provider';

const EXPIRES_IN_FIVE_MINUTES = 60 * 5;
// const EXPIRES_IN_ONE_WEEK = 60 * 60 * 24 * 7;
const EXPIRES_IN_ONE_WEEK = 60 * 10;

@Injectable()
export class JwtAuthTokenGenerator implements AuthTokenGenerator {
  private ACCESS_TOKEN_SECRET: string;
  private REFRESH_TOKEN_SECRET: string;

  constructor(private readonly environment: EnvironmentProvider) {
    this.ACCESS_TOKEN_SECRET = this.environment.get('ACCESS_TOKEN_SECRET');
    this.REFRESH_TOKEN_SECRET = this.environment.get('REFRESH_TOKEN_SECRET');
  }

  generateAccessToken(userId: string): string | Promise<string> {
    return jwt.sign({}, this.ACCESS_TOKEN_SECRET, {
      subject: userId,
      expiresIn: EXPIRES_IN_FIVE_MINUTES,
    });
  }

  generateRefreshToken(userId: string): string | Promise<string> {
    return jwt.sign({}, this.REFRESH_TOKEN_SECRET, {
      subject: userId,
      expiresIn: EXPIRES_IN_ONE_WEEK,
    });
  }

  checkAccessToken(token: string): boolean | Promise<boolean> {
    try {
      return Boolean(jwt.verify(token, this.ACCESS_TOKEN_SECRET));
    } catch {
      return false;
    }
  }

  checkRefreshToken(token: string): boolean | Promise<boolean> {
    try {
      return Boolean(jwt.verify(token, this.REFRESH_TOKEN_SECRET));
    } catch {
      return false;
    }
  }

  decodeRefreshToken(token: string): RefreshTokenPayload {
    const refreshToken = jwt.decode(token) as jwt.JwtPayload;
    return {
      userId: refreshToken.sub,
    };
  }
  decodeAccessToken(token: string): AccessTokenPayload {
    const accessToken = jwt.decode(token) as jwt.JwtPayload;
    return {
      userId: accessToken.sub,
    };
  }
}
