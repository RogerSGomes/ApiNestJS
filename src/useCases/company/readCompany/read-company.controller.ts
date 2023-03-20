import { Controller, Get, Param, Query } from "@nestjs/common/decorators";
import { CompanyRepository } from "src/repositories/company.repository";

@Controller("company")
export class ReadCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Get(":id?")
  async getCompanies(
    @Param("id") id: string,
    @Query("page") page: string,
    @Query("items_per_page") items_per_page: string
  ) {
    if (!id) {
      const response = await this.repository.findAll(
        Number(page),
        Number(items_per_page)
      );

      return response;
    } else {
      const response = await this.repository.findOne(Number(id));

      return response;
    }
  }
}
