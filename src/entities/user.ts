export type UserRole = 'user' | 'admin';

interface UserProps {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  role: UserRole;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _lastName: string;
  private readonly _email: string;
  private readonly _phone: string;
  private readonly _role: UserRole;
  private readonly _isEmailVerified: boolean;
  private readonly _password: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(args: UserProps) {
    this._id = args.id;
    this._name = args.name;
    this._lastName = args.lastName;
    this._email = args.email;
    this._isEmailVerified = args.isEmailVerified;
    this._role = args.role;
    this._phone = args.phone;
    this._password = args.password;
    this._createdAt = args.createdAt;
    this._updatedAt = args.updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get role(): UserRole {
    return this._role;
  }

  get isEmailVerified(): boolean {
    return this._isEmailVerified;
  }

  get phone(): string {
    return this._phone;
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
