import { Body, Controller, Post } from "@nestjs/common/decorators";

import { CompanyRepository } from "src/repositories/company.repository";
import { CreateCompanyDTO } from "./create-company.dto";

@Controller("company")
export class CreateCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Post()
  async createCompany(@Body() body: CreateCompanyDTO) {
    return await this.repository.create(body);
  }
}
