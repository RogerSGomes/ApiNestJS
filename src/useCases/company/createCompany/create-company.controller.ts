import { Body, Controller, Post } from "@nestjs/common";

import { CompanyRepository } from "../../../repositories/company.repository";
import { CreateCompanyDTO } from "./create-company.dto";

@Controller("company")
export class CreateCompanyController {
  constructor(private readonly repository: CompanyRepository) {}

  @Post()
  async createCompany(
    @Body() createCompanyDTO: CreateCompanyDTO
  ): Promise<IResponse> {
    createCompanyDTO.validateFields();

    await this.repository.create(createCompanyDTO);

    return {
      message: "Empresa criada com sucesso.",
    };
  }
}
