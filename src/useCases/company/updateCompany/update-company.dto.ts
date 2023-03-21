import { HttpException, HttpStatus } from "@nestjs/common";

export class UpdateCompanyDTO {
  name?: string;
  description?: string;
  line_business?: string;

  validateFields(): void {
    if (
      Object.values(this).every((value) => value === undefined || value === "")
    ) {
      throw new HttpException(
        {
          error:
            "Ao menos um campo deve ser fornecido para atualizar a empresa",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  cleanUpdateFields(): Partial<UpdateCompanyDTO> {
    return Object.keys(this).reduce((accumulator, key) => {
      const value = this[key];
      if (value !== null && value !== "") {
        return { ...accumulator, [key]: value };
      }
      return accumulator;
    }, {});
  }
}
