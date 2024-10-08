import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordEncrypter } from 'src/common/interfaces/cryptography/password-encrypter';
import { BcryptPasswordEncrypter } from 'src/libs/bcrypt/bcrypt-password-encrypter';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: PasswordEncrypter,
      useClass: BcryptPasswordEncrypter,
    },
  ],
})
export class UserModule {}
