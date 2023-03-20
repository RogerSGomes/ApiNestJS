import { Controller, Delete, Param } from "@nestjs/common";
import { UserRepository } from "src/repositories/user.repository";

@Controller("user")
export class DeleteUserController {
  constructor(private repository: UserRepository) {}

  @Delete(":id?")
  async deleteUser(@Param("id") id: string) {
    const response = await this.repository.delete(Number(id));

    return response;
  }
}
