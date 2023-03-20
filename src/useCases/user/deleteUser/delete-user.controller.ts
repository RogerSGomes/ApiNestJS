import { Controller, Delete, Param } from "@nestjs/common";
import { UserRepository } from "src/repositories/user.repository";

@Controller("user")
export class DeleteUserController {
  constructor(private repository: UserRepository) {}

  @Delete(":id?")
  async deleteUser(@Param("id") id: string) {
    return await this.repository.delete(Number(id));
  }
}
