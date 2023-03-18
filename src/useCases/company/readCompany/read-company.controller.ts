import { Controller, Get, Param, Query } from "@nestjs/common/decorators";
import { CompanyRepository } from "src/repositories/company.repository";

@Controller("company")
export class ReadCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Get("")
  async getCompanies(
    @Query("page") page: string,
    @Query("items_per_page") items_per_page: string
  ) {
    const response = await this.repository.findAll(
      Number(page),
      Number(items_per_page)
    );

    return response;
  }

  @Get(":id")
  async getOneCompany(@Param("id") id: StringConstructor) {
    const response = await this.repository.findOne(Number(id));

    return response;
  }
}
