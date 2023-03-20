import { Controller, Delete, Param } from "@nestjs/common";

import { CompanyRepository } from "src/repositories/company.repository";

@Controller("company")
export class DeleteCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Delete(":id?")
  async deleteCompany(@Param("id") id: string) {
    return await this.repository.delete(Number(id));
  }
}
