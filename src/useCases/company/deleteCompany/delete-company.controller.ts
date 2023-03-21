import { Controller, Delete, Param } from "@nestjs/common";

import { CompanyRepository } from "../../../repositories/company.repository";
import { ParseIntPipe } from "../../../pipes/parse-int.pipe";

@Controller("company")
export class DeleteCompanyController {
  constructor(private repository: CompanyRepository) {}

  @Delete(":id?")
  async deleteCompany(
    @Param("id", ParseIntPipe) id: number
  ): Promise<IResponse> {
    await this.repository.delete(id);

    return {
      message: "Empresa deletada com sucesso.",
    };
  }
}
