import { Body, Controller, Post } from "@nestjs/common/decorators";

import { CompanyRepository } from "src/repositories/company.repository";

import { CreateCompanyDTO } from "./create-company.dto";

@Controller("company")
export class CreateCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Post("create")
  async createCompany(@Body() body: CreateCompanyDTO) {
    const { name, description, line_business } = body;
    const response = await this.repository.create(
      name,
      description,
      line_business
    );

    return response;
  }
}
