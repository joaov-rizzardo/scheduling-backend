import { CompanyAddressRepository } from 'src/common/interfaces/repositories/company-address-repository';
import { CompanyAddress } from 'src/entities/company-address';
import { CompanyAddressDTO } from 'src/modules/company/dtos/company-address-dto';
import { PrismaService } from '../prisma.service';
import { CompanyAddress as PrismaCompanyAddress } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCompanyAddressRepository
  implements CompanyAddressRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    companyId: string,
    args: CompanyAddressDTO,
  ): Promise<CompanyAddress> {
    const result = await this.prisma.companyAddress.create({
      data: {
        city: args.city,
        country: args.country,
        number: args.number,
        postal_code: args.postalCode,
        state: args.state,
        street: args.street,
        company_id: companyId,
        additional_information: args.additionalInformation,
      },
    });
    return this.instanceCompanyAddress(result);
  }

  private instanceCompanyAddress(data: PrismaCompanyAddress): CompanyAddress {
    return new CompanyAddress({
      companyId: data.company_id,
      city: data.city,
      country: data.country,
      number: data.number,
      postalCode: data.postal_code,
      state: data.state,
      street: data.street,
      additionalInformation: data.additional_information,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }
}
