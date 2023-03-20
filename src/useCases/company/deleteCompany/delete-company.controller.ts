import { Controller, Delete, Param } from "@nestjs/common";

import { CompanyRepository } from "src/repositories/company.repository";

@Controller("company")
export class DeleteCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Delete(":id?")
  async deleteCompany(@Param("id") id: string) {
    const response = await this.repository.delete(Number(id));

    return response;
  }
}
