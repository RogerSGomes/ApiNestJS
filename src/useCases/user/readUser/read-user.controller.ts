import { Controller, Get, Query, Param } from "@nestjs/common";

import { UserRepository } from "../../../repositories/user.repository";
import { ParseIntPipe } from "../../../pipes/parse-int.pipe";
import { ReadUserDTO } from "./read-user.dto";

@Controller("user")
export class ReadUserController {
  constructor(private repository: UserRepository) {}

  @Get()
  async getAllUsers(
    @Query("page", ParseIntPipe) page: number,
    @Query("items_per_page", ParseIntPipe) items_per_page: number
  ): Promise<IResponse> {
    const readUserDTO = new ReadUserDTO();

    if ((page || page == 0) && (items_per_page || items_per_page == 0)) {
      readUserDTO.page = page;
      readUserDTO.items_per_page = items_per_page;

      readUserDTO.validateFields();
    }

    const users = await this.repository.findAll(readUserDTO);

    return {
      data: users,
    };
  }

  @Get(":id?")
  async getOneUser(@Param("id", ParseIntPipe) id: number): Promise<IResponse> {
    const user = await this.repository.findOne(id);

    return {
      data: user,
    };
  }
}
