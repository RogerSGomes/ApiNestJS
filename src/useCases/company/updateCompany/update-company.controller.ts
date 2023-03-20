import { Controller, Put, Param, Body } from "@nestjs/common/decorators";
import { CompanyRepository } from "src/repositories/company.repository";
import { UpdateCompanyDTO } from "./update-company.dto";

@Controller("company")
export class UpdateCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Put(":id?")
  async updateCompany(@Param("id") id: string, @Body() body: UpdateCompanyDTO) {
    const { name, description, line_business } = body;
    const response = await this.repository.update(
      Number(id),
      name,
      description,
      line_business
    );

    return response;
  }
}
