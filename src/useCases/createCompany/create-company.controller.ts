import { Body, Controller, Post } from "@nestjs/common/decorators";

import { PrismaService } from "src/database/prisma.service";
import { CreateCompanyDTO } from "src/dtos/create-company.dto";

@Controller("company")
export class CreateCompanyController {
  constructor(private prisma: PrismaService) {}

  @Post("create")
  createCompany(@Body() body: CreateCompanyDTO) {
    const { name } = body;

    return {
      name,
    };
  }
}
