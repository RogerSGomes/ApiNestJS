import { Controller, Delete, Param } from "@nestjs/common";

import { UserRepository } from "../../../repositories/user.repository";
import { ParseIntPipe } from "../../../pipes/parse-int.pipe";

@Controller("user")
export class DeleteUserController {
  constructor(private repository: UserRepository) {}

  @Delete(":id?")
  async deleteUser(@Param("id", ParseIntPipe) id: number) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
