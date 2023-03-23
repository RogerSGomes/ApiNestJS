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
    @Body() updateUserDTO: UpdateUserDTO
  ): Promise<IResponse> {
    updateUserDTO.validateFields();

    await this.repository.update(id, updateUserDTO);

    return {
      message: "Usuário atualizado com sucesso.",
    };
  }
}
