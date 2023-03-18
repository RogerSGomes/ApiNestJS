import { Injectable, HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";

import { PrismaService } from "src/database/prisma.service";
import { IResponse, UserRepository } from "../user.repository";

// DTOS
////

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, items_per_page: number): Promise<IResponse> {
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
    } else {
      const userAmount = await this.prisma.user.count();
      const users = await this.prisma.user.findMany({
        skip: (page - 1) * items_per_page,
        take: items_per_page,
        orderBy: { id: "asc" },
      });

      if (userAmount == 0) {
        throw new HttpException(
          {
            error: "Não existe nenhum usuário cadastrado.",
          },
          HttpStatus.NOT_FOUND
        );
      }

      if (users.length === 0) {
        throw new HttpException(
          {
            error: "Esta página não contém usuários.",
          },
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

    const userAmount = await this.prisma.user.count();

    if (userAmount === 0) {
      throw new HttpException(
        {
          error: "Não existe nenhum usuário cadastrado.",
        },
        HttpStatus.NOT_FOUND
      );
    } else {
      try {
        const user = await this.prisma.user.findFirstOrThrow({
          where: { id },
          include: {
            company: true,
          },
        });

        return {
          data: user,
        };
      } catch (err) {
        throw new HttpException(
          {
            error: `O usuário com ID ${id} não existe.`,
          },
          HttpStatus.NOT_FOUND
        );
      }
    }
  }

  async create(name: string, company_id: number): Promise<IResponse> {
    if (!name || !company_id) {
      throw new HttpException(
        {
          error: "Os campos 'name' e 'company' são obrigatórios.",
        },
        HttpStatus.BAD_REQUEST
      );
    } else {
      try {
        await this.prisma.user.create({
          data: {
            name,
            company_id,
          },
        });

        return {
          message: "Usuário criado com sucesso.",
        };
      } catch (err) {
        throw new HttpException(
          {
            error: `A empresa com ID ${company_id} não existe.`,
          },
          HttpStatus.NOT_FOUND
        );
      }
    }
  }

  async update(
    id: number,
    name: string,
    company_id: number
  ): Promise<IResponse> {
    return {};
  }

  async delete(id: number): Promise<IResponse> {
    return {};
  }
}
