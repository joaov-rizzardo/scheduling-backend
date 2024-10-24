interface CompanyAddressProps {
  companyId: string;
  street: string;
  city: string;
  state: string;
  number: string;
  postalCode: string;
  country: string;
  neighborhood: string;
  additionalInformation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyAddress {
  private _companyId: string;
  private _street: string;
  private _city: string;
  private _state: string;
  private _number: string;
  private _postalCode: string;
  private _country: string;
  private _neighborhood: string;
  private _additionalInformation?: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(args: CompanyAddressProps) {
    this._companyId = args.companyId;
    this._street = args.street;
    this._city = args.city;
    this._state = args.state;
    this._number = args.number;
    this._postalCode = args.postalCode;
    this._country = args.country;
    this._neighborhood = args.neighborhood;
    this._additionalInformation = args.additionalInformation;
    this._createdAt = args.createdAt;
    this._updatedAt = args.updatedAt;
  }

  get companyId(): string {
    return this._companyId;
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get number(): string {
    return this._number;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  get country(): string {
    return this._country;
  }

  get neighborhood(): string {
    return this._neighborhood;
  }

  get additionalInformation(): string | undefined {
    return this._additionalInformation;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
