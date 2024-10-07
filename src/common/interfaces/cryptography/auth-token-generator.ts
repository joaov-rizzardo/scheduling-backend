export interface AccessTokenPayload {
  userId: string;
}

export interface RefreshTokenPayload {
  userId: string;
}

export abstract class AuthTokenGenerator {
  abstract generateAccessToken(userId: string): string | Promise<string>;
  abstract generateRefreshToken(userId: string): string | Promise<string>;
  abstract checkAccessToken(token: string): boolean | Promise<boolean>;
  abstract checkRefreshToken(token: string): boolean | Promise<boolean>;
  abstract decodeRefreshToken(
    token: string,
  ): RefreshTokenPayload | Promise<RefreshTokenPayload>;
  abstract decodeAccessToken(
    token: string,
  ): AccessTokenPayload | Promise<AccessTokenPayload>;
}
