import { Controller, Put, Param, Body } from "@nestjs/common/decorators";

import { CompanyRepository } from "src/repositories/company.repository";
import { ParseIntPipe } from "src/pipes/parse-int.pipe";
import { UpdateCompanyDTO } from "./update-company.dto";

@Controller("company")
export class UpdateCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Put(":id?")
  async updateCompany(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateCompanyDTO
  ) {
    return await this.repository.update(id, body);
  }
}
