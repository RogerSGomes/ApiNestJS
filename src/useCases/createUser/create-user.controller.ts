import { Body, Controller, Post } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { CreateUserDTO } from "src/dtos/create-user.dto";

@Controller("user")
export class CreateUserController {
  constructor(private prisma: PrismaService) {}

  @Post("create")
  createUser(@Body() body: CreateUserDTO) {
    const { name, company_id } = body;

    return {
      name,
      company_id,
    };
  }
}
