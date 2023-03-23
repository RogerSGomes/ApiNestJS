import { HttpException, HttpStatus } from "@nestjs/common";

export class UpdateUserDTO {
  name?: string;
  company_id?: number;

  validateFields(): void {
    if (
      Object.values(this).every((value) => value === undefined || value === "")
    ) {
      throw new HttpException(
        {
          error:
            "Ao menos um campo deve ser fornecido para atualizar o usuário",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  cleanUpdateFields(): Partial<UpdateUserDTO> {
    return Object.keys(this).reduce((accumulator, key) => {
      const value = this[key];
      if (value !== null && value !== "") {
        return { ...accumulator, [key]: value };
      }
      return accumulator;
    }, {});
  }
}
