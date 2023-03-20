import { Controller, Put, Param, Body } from "@nestjs/common";
import { UserRepository } from "src/repositories/user.repository";
import { UpdateUserDTO } from "./update-user.dto";

@Controller("user")
export class UpdateUserController {
  constructor(private repository: UserRepository) {}

  @Put(":id?")
  async updateUser(@Param("id") id: string, @Body() body: UpdateUserDTO) {
    const { name, company_id } = body;
    const response = await this.repository.update(Number(id), name, company_id);

    return response;
  }
}
