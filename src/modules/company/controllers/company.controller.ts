import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDTO } from '../dtos/create-company-dto';
import { UserGuard, UserRequest } from 'src/guards/user.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @HttpCode(201)
  @UseGuards(UserGuard)
  @Post('create')
  async create(@Body() args: CreateCompanyDTO, @Req() req: UserRequest) {
    const company = await this.companyService.createCompany(args, req.user.id);
    return {
      id: company.id,
      name: company.name,
      brandColor: company.brandColor,
      email: company.email,
      phone: company.phone,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }

  @UseGuards(UserGuard)
  @Get('authenticated-user')
  async findUserCompany(@Req() req: UserRequest) {
    return await this.companyService.findUserCompanies(req.user.id);
  }
}
