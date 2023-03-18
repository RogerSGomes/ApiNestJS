import { Controller, Get, Query, Param } from "@nestjs/common/decorators";
import { UserRepository } from "src/repositories/user.repository";

@Controller("user")
export class ReadUserController {
  constructor(private repository: UserRepository) {}

  @Get("")
  async getUsers(
    @Query("page") page: number,
    @Query("items_per_page") items_per_page: number
  ) {
    const response = await this.repository.findAll(
      Number(page),
      Number(items_per_page)
    );
    return response;
  }

  @Get(":id")
  async getOneUser(@Param("id") id: number) {
    const response = await this.repository.findOne(Number(id));
    return response;
  }
}
