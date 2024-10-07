import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/interfaces/repositories/user-repository';
import { User } from 'src/entities/user';
import { PrismaService } from '../prisma.service';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!result) return null;
    return this.instanceUser(result);
  }

  private instanceUser(data: PrismaUser): User {
    return new User({
      name: data.name,
      email: data.email,
      isEmailVerified: data.is_email_verified,
      role: data.role,
      id: data.id,
      createdAt: data.created_at,
      lastName: data.last_name,
      password: data.password,
      phone: data.phone,
      updatedAt: data.updated_at,
    });
  }
}
