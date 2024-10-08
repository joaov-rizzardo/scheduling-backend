import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordEncrypter } from 'src/common/interfaces/cryptography/password-encrypter';
import { BcryptPasswordEncrypter } from 'src/libs/bcrypt/bcrypt-password-encrypter';
import { AuthTokenGenerator } from 'src/common/interfaces/cryptography/auth-token-generator';
import { JwtAuthTokenGenerator } from 'src/libs/jwt/jwt-auth-token-generator';
import { UserGuard } from 'src/guards/user.guard';

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserGuard,
    {
      provide: PasswordEncrypter,
      useClass: BcryptPasswordEncrypter,
    },
    {
      provide: AuthTokenGenerator,
      useClass: JwtAuthTokenGenerator,
    },
  ],
  exports: [UserGuard, AuthTokenGenerator],
})
export class AuthModule {}
