import { Injectable } from '@nestjs/common';
import {
  CreateUserParams,
  UserRepository,
} from 'src/common/interfaces/repositories/user-repository';
import { User } from 'src/entities/user';
import { PrismaService } from '../prisma.service';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserParams): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        name: data.name,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
      },
    });
    return this.instanceUser(result);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!result) return null;
    return this.instanceUser(result);
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        id,
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
