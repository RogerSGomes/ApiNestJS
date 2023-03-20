import { Controller, Put, Param, Body } from "@nestjs/common/decorators";
import { CompanyRepository } from "src/repositories/company.repository";
import { UpdateCompanyDTO } from "./update-company.dto";

@Controller("company")
export class UpdateCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Put(":id?")
  async updateCompany(@Param("id") id: string, @Body() body: UpdateCompanyDTO) {
    return await this.repository.update(Number(id), body);
  }
}
