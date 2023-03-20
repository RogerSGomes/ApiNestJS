import { Controller, Get, Param, Query } from "@nestjs/common";

import { CompanyRepository } from "src/repositories/company.repository";
import { ParseIntPipe } from "src/pipes/parse-int.pipe";
import { ReadCompanyDTO } from "./read-company.dto";

@Controller("company")
export class ReadCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Get(":id?")
  async getCompanies(
    @Param("id", ParseIntPipe) id: number,
    @Query("page", ParseIntPipe) page: number,
    @Query("items_per_page", ParseIntPipe) items_per_page: number
  ) {
    if (id) {
      return await this.repository.findOne(id);
    } else {
      const query: ReadCompanyDTO = {
        page,
        items_per_page,
      };

      return await this.repository.findAll(query);
    }
  }
}
