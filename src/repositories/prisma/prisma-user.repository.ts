import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { UserRepository } from "../user.repository";

// DTOS
import { ReadUserDTO } from "../../useCases/user/readUser/read-user.dto";
import { CreateUserDTO } from "../../useCases/user/createUser/create-user.dto";
import { UpdateUserDTO } from "../../useCases/user/updateUser/update-user.dto";
@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(readUserDTO: ReadUserDTO): Promise<IUser[]> {
    let users: IUser[];

    if (readUserDTO.page && readUserDTO.items_per_page) {
      const { page, items_per_page } = readUserDTO;

      users = await this.prisma.user.findMany({
        skip: (page - 1) * items_per_page,
        take: items_per_page,
        orderBy: { id: "asc" },
      });
    } else {
      users = await this.prisma.user.findMany({
        orderBy: { id: "asc" },
      });
    }

    if (users.length === 0) {
      throw new HttpException(
        {
          error: "Nenhum usuário encontrado.",
        },
        HttpStatus.NOT_FOUND
      );
    }

    return users;
  }

  async findOne(id: number): Promise<IUser> {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { id },
        include: { company: true },
      });
    } catch {
      throw new HttpException(
        {
          error: `Não foi encontrado o usuário com id ${id}.`,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    if (await this.userExists(createUserDTO)) {
      throw new HttpException(
        {
          error: "Este usuário já existe.",
        },
        HttpStatus.CONFLICT
      );
    }

    try {
      return await this.prisma.user.create({
        data: createUserDTO,
      });
    } catch {
      throw new HttpException(
        {
          error: `Não foi possível criar o usuário vinculado a empresa com ID ${createUserDTO.company_id}. Esta empresa não existe`,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<IUser> {
    try {
      const data: Partial<UpdateUserDTO> = updateUserDTO.cleanUpdateFields();

      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch {
      throw new HttpException(
        {
          error: `O usuário com id ${id} não existe.`,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async delete(id: number): Promise<IUser> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch {
      throw new HttpException(
        {
          error: `O usuário com id ${id} não existe.`,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async userExists(createUserDTO: CreateUserDTO): Promise<boolean> {
    const { name, company_id } = createUserDTO;

    const userExists = await this.prisma.user.findFirst({
      where: {
        name,
        company_id,
      },
    });

    return userExists ? true : false;
  }
}
