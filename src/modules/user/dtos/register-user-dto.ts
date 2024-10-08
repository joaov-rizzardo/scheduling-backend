import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDTO {
  @MinLength(2, {
    message: 'The name length must have at least 2 caracters',
  })
  @MaxLength(50, {
    message: 'The name length cannot exceed 50 caracters',
  })
  name: string;

  @MinLength(2, {
    message: 'The last name length must have at least 2 caracters',
  })
  @MaxLength(50, {
    message: 'The last name length cannot exceed 50 caracters',
  })
  lastName: string;

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

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: 'The provided password is invalid',
    },
  )
  password: string;
}
