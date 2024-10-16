import { Company } from 'src/entities/company';
import { CreateCompanyDTO } from 'src/modules/company/dtos/create-company-dto';

export abstract class CompanyRepository {
  abstract create(args: CreateCompanyDTO): Company | Promise<Company>;
}
