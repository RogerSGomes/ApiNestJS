import { Controller, Post, Body } from "@nestjs/common";

import { UserRepository } from "../../../repositories/user.repository";
import { CreateUserDTO } from "./create-user.dto";

@Controller("user")
export class CreateUserController {
  constructor(private repository: UserRepository) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<IResponse> {
    createUserDTO.validateFields();

    await this.repository.create(createUserDTO);

    return {
      message: "Usuário cadastrado com sucesso.",
    };
  }
}
