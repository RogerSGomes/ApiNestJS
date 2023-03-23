import { HttpException, HttpStatus } from "@nestjs/common";

export class ReadUserDTO {
  page: number;
  items_per_page: number;

  validateFields(): void {
    if (
      !this.page ||
      !this.items_per_page ||
      isNaN(this.page) ||
      isNaN(this.items_per_page) ||
      this.page < 1 ||
      this.items_per_page < 1
    ) {
      throw new HttpException(
        {
          error:
            "Os parâmetros 'page' e 'items_per_page' devem ser números maiores ou iguais a 1.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
