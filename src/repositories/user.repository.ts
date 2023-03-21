import { ReadUserDTO } from "src/useCases/user/readUser/read-user.dto";
import { CreateUserDTO } from "src/useCases/user/createUser/create-user.dto";
import { UpdateUserDTO } from "src/useCases/user/updateUser/update-user.dto";

export abstract class UserRepository {
  abstract findAll(query: ReadUserDTO): Promise<IUser[]>;

  abstract findOne(id: number): Promise<IUser>;

  abstract create(body: CreateUserDTO): Promise<IUser>;

  abstract update(id: number, body: UpdateUserDTO): Promise<IUser>;

  abstract delete(id: number): Promise<IUser>;
}
