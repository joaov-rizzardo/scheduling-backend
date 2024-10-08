import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/entities/user';

export const Roles = (roles: UserRole[]) => SetMetadata('user-roles', roles);
