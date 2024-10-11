import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './dtos/register-user-dto';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/common/interfaces/repositories/user-repository';
import { PasswordEncrypter } from 'src/common/interfaces/cryptography/password-encrypter';
import { UserEmailAlreadyUsed } from './errors/user-email-already-used';
import { UserNotExists } from 'src/common/errors/user-not-exists';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordEncrypter: PasswordEncrypter,
  ) {}

  async register(data: RegisterUserDTO): Promise<User> {
    if ((await this.userRepo.findByEmail(data.email)) !== null) {
      throw new UserEmailAlreadyUsed();
    }
    const encryptedPassword = await this.passwordEncrypter.encrypt(
      data.password,
    );
    const user = await this.userRepo.create({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: encryptedPassword,
      role: 'user',
    });
    return user;
  }

  async findUserById(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new UserNotExists();
    return user;
  }
}
