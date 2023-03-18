import { Injectable, HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";

import { PrismaService } from "src/database/prisma.service";
import { IResponse, UserRepository } from "../user.repository";

// DTOS
////

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

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
            companyId: company_id,
          },
        });

        return {
          message: "Usuário criado com sucesso.",
        };
      } catch (err) {
        throw new HttpException(
          {
            error: `A empresa com ID ${company_id} não existe.`,
            error_description: err,
          },
          HttpStatus.NOT_FOUND
        );
      }
    }
  }
}
