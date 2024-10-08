import { User } from 'src/entities/user';

export abstract class UserRepository {
  abstract findById(id: string): User | null | Promise<User | null>;
  abstract findByEmail(email: string): User | null | Promise<User | null>;
}
