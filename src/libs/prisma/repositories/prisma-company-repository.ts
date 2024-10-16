import { CompanyRepository } from 'src/common/interfaces/repositories/company-repository';
import { Company } from 'src/entities/company';
import { CreateCompanyDTO } from 'src/modules/company/dtos/create-company-dto';
import { PrismaService } from '../prisma.service';
import { Company as PrismaCompany } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(args: CreateCompanyDTO): Promise<Company> {
    const result = await this.prisma.company.create({
      data: {
        name: args.name,
        email: args.email,
        phone: args.phone,
        brand_color: args.brandColor,
      },
    });
    return this.instanceCompany(result);
  }

  async findById(id: string): Promise<Company | null> {
    const result = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });
    if (!result) return null;
    return this.instanceCompany(result);
  }

  private instanceCompany(data: PrismaCompany): Company {
    return new Company({
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      brandColor: data.brand_color,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }
}
