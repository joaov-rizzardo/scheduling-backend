import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginDTO {
    @IsEmail({}, {
        message: "The provided email is invalid"
    })
    email: string;

    @IsNotEmpty({
        message: "Password is not provided"
    })
    password: string;
}