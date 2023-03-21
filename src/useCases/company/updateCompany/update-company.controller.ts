import { Controller, Put, Param, Body } from "@nestjs/common";

import { CompanyRepository } from "../../../repositories/company.repository";
import { ParseIntPipe } from "../../../pipes/parse-int.pipe";
import { UpdateCompanyDTO } from "./update-company.dto";

@Controller("company")
export class UpdateCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Put(":id?")
  async updateCompany(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCompanyDTO: UpdateCompanyDTO
  ): Promise<IResponse> {
    updateCompanyDTO.validateFields();

    const response = await this.repository.update(id, updateCompanyDTO);

    return {
      data: response,
    };
  }
}
