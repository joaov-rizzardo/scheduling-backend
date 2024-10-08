import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserUnauthorized } from 'src/common/exceptions/user-unauthorized';
import { AuthTokenGenerator } from 'src/common/interfaces/cryptography/auth-token-generator';
import { UserRepository } from 'src/common/interfaces/repositories/user-repository';
import { User, UserRole } from 'src/entities/user';

export interface UserRequest extends Request {
  user: User;
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authToken: AuthTokenGenerator,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<UserRequest>();
      const token = this.extractTokenFromRequest(request);
      if ((await this.authToken.checkAccessToken(token)) === false) {
        throw new UserUnauthorized();
      }
      const { userId } = await this.authToken.decodeAccessToken(token);
      const user = await this.userRepository.findById(userId);
      if (!user) throw new UserUnauthorized();
      const roles = this.reflector.get<UserRole[]>(
        'user-roles',
        context.getHandler(),
      );
      if (roles && !roles.includes(user.role)) throw new UserUnauthorized();
      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof UserUnauthorized) {
        throw new UnauthorizedException({
          code: error.code,
          message: error.message,
        });
      }
      throw error;
    }
  }

  private extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}