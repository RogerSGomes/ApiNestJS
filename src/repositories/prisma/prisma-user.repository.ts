import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { PrismaService } from "src/database/prisma.service";
import { UserRepository, IResponse } from "../user.repository";

// DTOS
import { ReadUserDTO } from "src/useCases/user/readUser/read-user.dto";
import { CreateUserDTO } from "src/useCases/user/createUser/create-user.dto";
import { UpdateUserDTO } from "src/useCases/user/updateUser/update-user.dto";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll({ page, items_per_page }: ReadUserDTO): Promise<IResponse> {
    if (
      !page ||
      !items_per_page ||
      isNaN(page) ||
      isNaN(items_per_page) ||
      page < 1 ||
      items_per_page < 1
    ) {
      throw new HttpException(
        {
          error:
            "Os parâmetros 'page' e 'items_per_page' são obrigatórios e devem ser números maiores que 1.",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const userAmount = await this.userAmount();
    if (userAmount == 0) {
      throw new HttpException(
        { error: "Não existe nenhum usuário cadastrado." },
        HttpStatus.NOT_FOUND
      );
    }

    const users = await this.prisma.user.findMany({
      skip: (page - 1) * items_per_page,
      take: items_per_page,
      orderBy: { id: "asc" },
    });

    if (users.length === 0) {
      throw new HttpException(
        { error: "Esta página não contém usuários." },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      data: {
        users,
        total: userAmount,
      },
    };
  }

  async findOne(id: number): Promise<IResponse> {
    if (!id || isNaN(id) || id < 1) {
      throw new HttpException(
        {
          error:
            "O parâmetro 'id' é obrigatório e deve ser um número maior ou igual a 1.",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    if ((await this.userAmount()) === 0) {
      throw new HttpException(
        { error: "Não existe nenhum usuário cadastrado." },
        HttpStatus.NOT_FOUND
      );
    }

    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { id },
        include: { company: true },
      });

      return { data: user };
    } catch {
      throw new HttpException(
        { error: `O usuário com ID ${id} não existe.` },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async create({ name, company_id }: CreateUserDTO): Promise<IResponse> {
    if (!name || !company_id) {
      throw new HttpException(
        { error: "Os campos 'name' e 'company' são obrigatórios." },
        HttpStatus.BAD_REQUEST
      );
    }

    const userAlreadyExists = await this.prisma.user.findFirst({
      where: { name, company_id },
    });

    if (userAlreadyExists) {
      throw new HttpException(
        { error: `Este usuário já existe.` },
        HttpStatus.CONFLICT
      );
    }

    try {
      await this.prisma.user.create({
        data: {
          name,
          company_id,
        },
      });

      return { message: "Usuário criado com sucesso." };
    } catch {
      throw new HttpException(
        { error: `A empresa com ID ${company_id} não existe.` },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async update(
    id: number,
    { name, company_id }: UpdateUserDTO
  ): Promise<IResponse> {
    // Verifica se o parâmetro 'id' é válido.
    if (!id || isNaN(id) || id < 1) {
      throw new HttpException(
        {
          error:
            "O parâmetro 'id' é obrigatório e deve ser um número maior ou igual a 1.",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    // Verifica se o usuário existe.
    try {
      await this.prisma.user.findFirstOrThrow({
        where: { id },
      });
    } catch {
      throw new HttpException(
        { error: "Usuário não encontrado." },
        HttpStatus.NOT_FOUND
      );
    }

    // Verifica pelo menos um dos parâmetros de atualização foram fornecidos.
    if (!name && !company_id) {
      throw new HttpException(
        { error: "Forneça o que deseja atualizar das informações do usuário." },
        HttpStatus.BAD_REQUEST
      );
    }

    const data: UpdateUserDTO = {
      name: name ?? undefined,
      company_id: company_id ?? undefined,
    };

    await this.prisma.user.update({
      where: { id },
      data,
    });

    return { message: "Usuário atualizado com sucesso." };
  }

  async delete(id: number): Promise<IResponse> {
    // Verifica se o parâmetro 'id' é válido.
    if (!id || isNaN(id) || id < 1) {
      throw new HttpException(
        {
          error:
            "O parâmetro 'id' é obrigatório e deve ser um número maior ou igual a 1.",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      await this.prisma.user.findFirstOrThrow({
        where: { id },
      });
    } catch {
      throw new HttpException(
        { error: "Este usuário não existe." },
        HttpStatus.NOT_FOUND
      );
    }

    await this.prisma.user.delete({
      where: { id },
    });

    if ((await this.userAmount()) === 0) {
      // Reinicia o AUTO_INCREMENT da tabela user para 1
      await this.prisma.$executeRaw`ALTER TABLE user AUTO_INCREMENT = 1;`;
    }

    return { message: "Usuário deletado com sucesso." };
  }

  private async userAmount() {
    return await this.prisma.user.count();
  }
}
