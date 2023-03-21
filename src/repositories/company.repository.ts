import { ReadCompanyDTO } from "src/useCases/company/readCompany/read-company.dto";
import { CreateCompanyDTO } from "src/useCases/company/createCompany/create-company.dto";
import { UpdateCompanyDTO } from "src/useCases/company/updateCompany/update-company.dto";

export abstract class CompanyRepository {
  abstract findAll(readCompanyDTO: ReadCompanyDTO): Promise<ICompany[]>;

  abstract findOne(id: number): Promise<ICompany>;

  abstract create(createCompanyDTO: CreateCompanyDTO): Promise<ICompany>;

  abstract update(
    id: number,
    updateCompanyDTO: UpdateCompanyDTO
  ): Promise<ICompany>;

  abstract delete(id: number): Promise<ICompany>;
}
