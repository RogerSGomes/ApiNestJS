import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from "@nestjs/common";

import { CompanyRepository } from "../../../repositories/company.repository";
import { ParseIntPipe } from "../../../pipes/parse-int.pipe";
import { ReadCompanyDTO } from "./read-company.dto";

@Controller("company")
export class ReadCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Get()
  async getAllCompanies(
    @Query("page", ParseIntPipe) page?: number,
    @Query("items_per_page", ParseIntPipe) items_per_page?: number
  ): Promise<IResponse> {
    const query = new ReadCompanyDTO();

    if ((page || page == 0) && (items_per_page || items_per_page == 0)) {
      query.page = page;
      query.items_per_page = items_per_page;

      query.validateFields();
    }

    const companies = await this.repository.findAll(query);

    return {
      data: companies,
    };
  }

  @Get(":id")
  async getOneCompany(
    @Param("id", ParseIntPipe)
    id: number
  ): Promise<IResponse> {
    const company = await this.repository.findOne(id);

    return {
      data: company,
    };
  }
}
