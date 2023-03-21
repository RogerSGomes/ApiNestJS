import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { UserRepository } from "../user.repository";

// DTOS
import { ReadUserDTO } from "../../useCases/user/readUser/read-user.dto";
import { CreateUserDTO } from "../../useCases/user/createUser/create-user.dto";
import { UpdateUserDTO } from "../../useCases/user/updateUser/update-user.dto";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ReadUserDTO): Promise<IUser[]> {
    const { page, items_per_page } = query;

    return await this.prisma.user.findMany({
      skip: (page - 1) * items_per_page,
      take: items_per_page,
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number): Promise<IUser> {
    return await this.prisma.user.findFirstOrThrow({
      where: { id },
      include: { company: true },
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    return await this.prisma.user.create({
      data: createUserDTO,
    });
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<IUser> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDTO,
    });
  }

  async delete(id: number): Promise<IUser> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
