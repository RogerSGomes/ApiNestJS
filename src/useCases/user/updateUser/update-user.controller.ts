import { Controller, Put, Param, Body } from "@nestjs/common";

import { UserRepository } from "../../../repositories/user.repository";
import { ParseIntPipe } from "../../../pipes/parse-int.pipe";
import { UpdateUserDTO } from "./update-user.dto";

@Controller("user")
export class UpdateUserController {
  constructor(private repository: UserRepository) {}

  @Put(":id?")
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO
  ) {
    try {
      return await this.repository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
