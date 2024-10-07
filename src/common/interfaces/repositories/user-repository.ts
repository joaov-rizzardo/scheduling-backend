import { User } from "src/entities/user";

export abstract class UserRepository {
    abstract findByEmail(email: string): User | null | Promise<User | null>;
}