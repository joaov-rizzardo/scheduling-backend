import { User, UserRole } from 'src/entities/user';

export interface CreateUserParams {
  name: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone: string;
  password: string;
}

export abstract class UserRepository {
  abstract findById(id: string): User | null | Promise<User | null>;
  abstract findByEmail(email: string): User | null | Promise<User | null>;
  abstract create(data: CreateUserParams): User | Promise<User>;
}
