import { Controller, Get, Query, Param } from "@nestjs/common/decorators";

import { UserRepository } from "src/repositories/user.repository";
import { ParseIntPipe } from "src/pipes/parse-int.pipe";
import { ReadUserDTO } from "./read-user.dto";

@Controller("user")
export class ReadUserController {
  constructor(private repository: UserRepository) {}

  @Get(":id?")
  async getUsers(
    @Param("id", ParseIntPipe) id: number,
    @Query("page", ParseIntPipe) page: number,
    @Query("items_per_page", ParseIntPipe) items_per_page: number
  ) {
    if (id) {
      return await this.repository.findOne(id);
    } else {
      const query: ReadUserDTO = {
        page,
        items_per_page,
      };

      return await this.repository.findAll(query);
    }
  }
}
