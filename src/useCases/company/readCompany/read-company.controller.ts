import { Controller, Get, Param, Query } from "@nestjs/common/decorators";
import { CompanyRepository } from "src/repositories/company.repository";
import { ReadCompanyDTO } from "./read-company.dto";

@Controller("company")
export class ReadCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Get(":id?")
  async getCompanies(@Param("id") id: string, @Query() query: ReadCompanyDTO) {
    if (id) {
      return await this.repository.findOne(Number(id));
    } else {
      return await this.repository.findAll(query);
    }
  }
}
