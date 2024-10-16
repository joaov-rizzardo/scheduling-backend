import { CompanyAddress } from './company-address';
import { CompanyMember } from './company-member';

interface CompanyProps {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  brandColor?: string;
  address?: CompanyAddress;
  members?: CompanyMember[];
  createdAt: Date;
  updatedAt: Date;
}

export class Company {
  private _id: string;
  private _name: string;
  private _email: string;
  private _phone: string;
  private _brandColor: string;
  private _address?: CompanyAddress;
  private _members?: CompanyMember[];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(args: CompanyProps) {
    this._id = args.id;
    this._name = args.name;
    this._email = args.email;
    this._phone = args.phone;
    this._brandColor = args.brandColor;
    this._address = args.address;
    this._members = args.members;
    this._createdAt = args.createdAt;
    this._updatedAt = args.updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get brandColor(): string {
    return this._brandColor;
  }

  get address(): CompanyAddress | undefined {
    return this._address;
  }

  get members(): CompanyMember[] | undefined {
    return this._members;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
