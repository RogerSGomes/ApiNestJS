import { Controller, Post, Body } from "@nestjs/common";

import { UserRepository } from "../../../repositories/user.repository";
import { CreateUserDTO } from "./create-user.dto";

@Controller("user")
export class CreateUserController {
  constructor(private repository: UserRepository) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    try {
      return await this.repository.create(body);
    } catch (error) {
      throw error;
    }
  }
}
