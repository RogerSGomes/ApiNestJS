import { ReadUserDTO } from "src/useCases/user/readUser/read-user.dto";
import { CreateUserDTO } from "src/useCases/user/createUser/create-user.dto";
import { UpdateUserDTO } from "src/useCases/user/updateUser/update-user.dto";

export interface IResponse {
  message?: string;
  data?: Object[] | Object;
}

export abstract class UserRepository {
  abstract findAll(query: ReadUserDTO): Promise<IResponse>;

  abstract findOne(id: number): Promise<IResponse>;

  abstract create(body: CreateUserDTO): Promise<IResponse>;

  abstract update(id: number, body: UpdateUserDTO): Promise<IResponse>;

  abstract delete(id: number): Promise<IResponse>;
}
