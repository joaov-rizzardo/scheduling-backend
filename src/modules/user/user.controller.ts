import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dtos/register-user-dto';
import { UserEmailAlreadyUsed } from './errors/user-email-already-used';
import { UserGuard, UserRequest } from 'src/guards/user.guard';
import { UserUnauthorized } from 'src/common/errors/user-unauthorized';
import { UserNotExists } from 'src/common/errors/user-not-exists';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(@Body() data: RegisterUserDTO) {
    try {
      const user = await this.userService.register(data);
      return {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error instanceof UserEmailAlreadyUsed) {
        throw new ConflictException({
          code: error.code,
          message: error.message,
        });
      }
      throw error;
    }
  }

  @UseGuards(UserGuard)
  @Get('token')
  public async findByToken(@Req() request: UserRequest) {
    const user = request.user;
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @UseGuards(UserGuard)
  @Get(':id')
  public async findById(@Param('id') id: string, @Req() request: UserRequest) {
    try {
      if (request.user.role === 'user' && request.user.id !== id) {
        throw new UserUnauthorized();
      }
      const user = await this.userService.findUserById(id);
      return {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error instanceof UserUnauthorized) {
        throw new UnauthorizedException({
          code: error.code,
          message: error.message,
        });
      }
      if (error instanceof UserNotExists) {
        throw new NotFoundException({
          code: error.code,
          message: error.message,
        });
      }
      throw error;
    }
  }
}
