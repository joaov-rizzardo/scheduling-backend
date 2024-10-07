import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordEncrypter } from 'src/common/interfaces/cryptography/password-encrypter';
import { BcryptPasswordEncrypter } from 'src/libs/bcrypt/bcrypt-password-encrypter';
import { AuthTokenGenerator } from 'src/common/interfaces/cryptography/auth-token-generator';
import { JwtAuthTokenGenerator } from 'src/libs/jwt/jwt-auth-token-generator';
import { EnvironmentProvider } from 'src/providers/environment-provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    EnvironmentProvider,
    {
      provide: PasswordEncrypter,
      useClass: BcryptPasswordEncrypter,
    },
    {
      provide: AuthTokenGenerator,
      useClass: JwtAuthTokenGenerator,
    },
  ],
})
export class AuthModule {}
