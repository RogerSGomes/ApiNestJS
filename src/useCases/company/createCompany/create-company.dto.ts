import { HttpException, HttpStatus } from "@nestjs/common";

export class CreateCompanyDTO {
  name: string;
  description: string;
  line_business: string;

  validateFields(): void {
    if (!this.name || !this.description || !this.line_business) {
      throw new HttpException(
        {
          error:
            "Os parâmetros 'name', 'description' e 'line_business' são obrigatórios",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
