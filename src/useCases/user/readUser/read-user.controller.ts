import { Controller, Get, Query, Param } from "@nestjs/common/decorators";
import { UserRepository } from "src/repositories/user.repository";
import { ReadUserDTO } from "./read-user.dto";

@Controller("user")
export class ReadUserController {
  constructor(private repository: UserRepository) {}

  @Get(":id?")
  async getUsers(@Param("id") id: string, @Query() query: ReadUserDTO) {
    if (id) {
      return await this.repository.findOne(Number(id));
    } else {
      return await this.repository.findAll(query);
    }
  }
}
