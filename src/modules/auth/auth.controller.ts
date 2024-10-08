import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login-dto';
import { RefreshTokenDTO } from './dtos/refresh-token-dto';
import { BadCredentials } from './errors/bad-credentials';
import { InvalidRefreshToken } from './errors/invalid-refresh-token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  public async login(@Body() { email, password }: LoginDTO) {
    try {
      const { accessToken, refreshToken } = await this.authService.login(
        email,
        password,
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof BadCredentials) {
        throw new UnauthorizedException({
          code: error.code,
          message: error.message,
        });
      }
      throw error;
    }
  }

  @Put('refresh')
  public async refresh(@Body() { token }: RefreshTokenDTO) {
    try {
      const accessToken = await this.authService.refresh(token);
      return {
        accessToken,
      };
    } catch (error) {
      if (error instanceof InvalidRefreshToken) {
        throw new UnauthorizedException({
          code: error.code,
          message: error.message,
        });
      }
      throw error;
    }
  }
}
