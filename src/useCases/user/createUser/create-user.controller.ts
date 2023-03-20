import { Controller, Post, Body } from "@nestjs/common";

import { UserRepository } from "src/repositories/user.repository";

import { CreateUserDTO } from "./create-user.dto";

@Controller("user")
export class CreateUserController {
  constructor(private repository: UserRepository) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    const { name, company_id } = body;
    const response = await this.repository.create(name, company_id);

    return response;
  }
}
