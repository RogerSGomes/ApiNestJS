import { ParseIntPipe } from "@nestjs/common";

export class ReadCompanyDTO {
  page: number;
  items_per_page: number;
}
