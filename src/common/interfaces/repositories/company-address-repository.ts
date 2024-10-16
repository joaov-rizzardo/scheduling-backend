import { CompanyAddress } from 'src/entities/company-address';
import { CompanyAddressDTO } from 'src/modules/company/dtos/company-address-dto';

export abstract class CompanyAddressRepository {
  abstract create(
    companyId: string,
    args: CompanyAddressDTO,
  ): CompanyAddress | Promise<CompanyAddress>;
}
