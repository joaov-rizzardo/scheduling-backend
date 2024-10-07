import { IsNotEmpty } from "class-validator";

export class RefreshTokenDTO {
    @IsNotEmpty({
        message: "Token is not provided"
    })
    token: string;
}