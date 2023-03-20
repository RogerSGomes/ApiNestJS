import { ReadCompanyDTO } from "src/useCases/company/readCompany/read-company.dto";
import { CreateCompanyDTO } from "src/useCases/company/createCompany/create-company.dto";
import { UpdateCompanyDTO } from "src/useCases/company/updateCompany/update-company.dto";

export interface IResponse {
  message?: string;
  data?: Object[] | Object;
}

export abstract class CompanyRepository {
  abstract findAll(query: ReadCompanyDTO): Promise<IResponse>;

  abstract findOne(id: number): Promise<IResponse>;

  abstract create(body: CreateCompanyDTO): Promise<IResponse>;

  abstract update(id: number, body: UpdateCompanyDTO): Promise<IResponse>;

  abstract delete(id: number): Promise<IResponse>;
}
