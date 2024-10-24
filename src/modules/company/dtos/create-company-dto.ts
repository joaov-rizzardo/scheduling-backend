import {
  IsEmail,
  IsHexColor,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CompanyAddressDTO } from './company-address-dto';
import { Type } from 'class-transformer';

export class CreateCompanyDTO {
  @MinLength(2, {
    message: 'The name length must have at least 2 caracters',
  })
  @MaxLength(50, {
    message: 'The name length cannot exceed 50 caracters',
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'The provided e-mail is invalid',
    },
  )
  email: string;

  @IsPhoneNumber(undefined, {
    message: 'The provided phone is invalid',
  })
  phone: string;

  @IsHexColor({
    message: 'The provided color is invalid',
  })
  brandColor: string;

  @ValidateNested()
  @Type(() => CompanyAddressDTO)
  address: CompanyAddressDTO;
}
