export abstract class PasswordEncrypter {
  abstract encrypt(password: string): string | Promise<string>;
  abstract check(
    password: string,
    hashedPassword: string,
  ): boolean | Promise<boolean>;
}
