import { IsNotEmpty, Length, Matches, MaxLength } from 'class-validator';

export class CompanyAddressDTO {
  @IsNotEmpty({
    message: 'Please provide the street field',
  })
  @MaxLength(50, {
    message: 'The street field length cannot exceed 50 caracters',
  })
  street: string;

  @IsNotEmpty({
    message: 'Please provide the city field',
  })
  @MaxLength(50, {
    message: 'The city field length cannot exceed 50 caracters',
  })
  city: string;

  @IsNotEmpty({
    message: 'Please provide the country field',
  })
  @MaxLength(50, {
    message: 'The country field length cannot exceed 50 caracters',
  })
  country: string;

  @Length(2, 2, {
    message: 'The state field must have exactly 2 caracters',
  })
  state: string;

  @Length(8, 8, {
    message: 'The postal code field must have exactly 8 caracters',
  })
  postalCode: string;

  @Length(1, 8, {
    message: 'The number field must have between 1 and 8 caracters',
  })
  @Matches(/^[0-9]+$/, { message: 'The number field must have only numbers' })
  number: string;

  @MaxLength(50, {
    message:
      'The additionalInformation field length cannot exceed 50 caracters',
  })
  additionalInformation?: string;
}
