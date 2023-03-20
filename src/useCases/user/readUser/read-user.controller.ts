import { Controller, Get, Query, Param } from "@nestjs/common/decorators";
import { UserRepository } from "src/repositories/user.repository";

@Controller("user")
export class ReadUserController {
  constructor(private repository: UserRepository) {}

  @Get(":id?")
  async getUsers(
    @Param("id") id: string,
    @Query("page") page: number,
    @Query("items_per_page") items_per_page: number
  ) {
    if (!id) {
      const response = await this.repository.findAll(
        Number(page),
        Number(items_per_page)
      );

      return response;
    } else {
      const response = await this.repository.findOne(Number(id));

      return response;
    }
  }
}
