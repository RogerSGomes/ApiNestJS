import { Controller, Post, Body } from "@nestjs/common";

import { UserRepository } from "src/repositories/user.repository";

import { CreateUserDTO } from "./create-user.dto";

@Controller("user")
export class CreateUserController {
  constructor(private repository: UserRepository) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    return await this.repository.create(body);
  }
}
