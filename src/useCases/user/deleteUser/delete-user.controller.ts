import { Controller, Delete, Param } from "@nestjs/common";

import { UserRepository } from "src/repositories/user.repository";
import { ParseIntPipe } from "src/pipes/parse-int.pipe";

@Controller("user")
export class DeleteUserController {
  constructor(private repository: UserRepository) {}

  @Delete(":id?")
  async deleteUser(@Param("id", ParseIntPipe) id: number) {
    return await this.repository.delete(id);
  }
}
