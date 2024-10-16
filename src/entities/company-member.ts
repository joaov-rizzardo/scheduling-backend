export type MemberRole = 'owner' | 'admin' | 'member';

interface CompanyMemberProps {
  userId: string;
  companyId: string;
  role: MemberRole;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyMember {
  private _userId: string;
  private _companyId: string;
  private _role: MemberRole;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(args: CompanyMemberProps) {
    this._userId = args.userId;
    this._companyId = args.companyId;
    this._role = args.role;
    this._createdAt = args.createdAt;
    this._updatedAt = args.updatedAt;
  }

  get userId(): string {
    return this._userId;
  }

  get companyId(): string {
    return this._companyId;
  }

  get role(): MemberRole {
    return this._role;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
