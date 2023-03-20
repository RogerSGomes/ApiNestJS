import { Controller, Delete, Param } from "@nestjs/common";

import { CompanyRepository } from "src/repositories/company.repository";
import { ParseIntPipe } from "src/pipes/parse-int.pipe";

@Controller("company")
export class DeleteCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Delete(":id?")
  async deleteCompany(@Param("id", ParseIntPipe) id: number) {
    return await this.repository.delete(id);
  }
}
