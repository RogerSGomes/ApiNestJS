import { Controller } from "@nestjs/common";
import { UserRepository } from "src/repositories/user.repository";

@Controller("user")
export class UpdateUserController {
  constructor(private repository: UserRepository) {}
}
