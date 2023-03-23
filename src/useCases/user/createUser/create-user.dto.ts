import { HttpException, HttpStatus } from "@nestjs/common";

export class CreateUserDTO {
  name: string;
  company_id: number;

  validateFields(): void {
    if (!this.name || !this.company_id) {
      throw new HttpException(
        {
          error: "Os parâmetros 'name' e 'company_id' são obrigatórios",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    if (isNaN(this.company_id) || this.company_id < 1) {
      throw new HttpException(
        {
          error:
            "O parâmetro 'company_id' deve ser um número maior ou igual a 1.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
