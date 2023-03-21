import { Injectable } from "@nestjs/common";
import { HttpException, HttpStatus } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { CompanyRepository } from "../company.repository";

// DTOS
import { ReadCompanyDTO } from "../../useCases/company/readCompany/read-company.dto";
import { CreateCompanyDTO } from "../../useCases/company/createCompany/create-company.dto";
import { UpdateCompanyDTO } from "../../useCases/company/updateCompany/update-company.dto";

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(readCompanyDTO: ReadCompanyDTO): Promise<ICompany[]> {
    let companies: ICompany[];

    if (readCompanyDTO.page && readCompanyDTO.items_per_page) {
      const { page, items_per_page } = readCompanyDTO;

      companies = await this.prisma.company.findMany({
        skip: (page - 1) * items_per_page,
        take: items_per_page,
        orderBy: { id: "asc" },
      });
    } else {
      companies = await this.prisma.company.findMany({
        orderBy: { id: "asc" },
      });
    }

    if (companies.length === 0) {
      throw new HttpException(
        {
          error: "Nenhuma empresa encontrada.",
        },
        HttpStatus.NOT_FOUND
      );
    }

    return companies;
  }

  async findOne(id: number): Promise<ICompany> {
    try {
      return await this.prisma.company.findFirstOrThrow({
        where: { id },
        include: { users: true },
      });
    } catch {
      throw new HttpException(
        {
          error: `Não foi encontrada a empresa com id ${id}.`,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async create(createCompanyDTO: CreateCompanyDTO): Promise<ICompany> {
    if (await this.companyExists(createCompanyDTO)) {
      throw new HttpException(
        {
          error: "Esta empresa já existe.",
        },
        HttpStatus.CONFLICT
      );
    }

    return await this.prisma.company.create({
      data: createCompanyDTO,
    });
  }

  async update(
    id: number,
    updateCompanyDTO: UpdateCompanyDTO
  ): Promise<ICompany> {
    try {
      const data: Partial<UpdateCompanyDTO> = updateCompanyDTO.cleanUpdateFields();

      return await this.prisma.company.update({
        where: { id },
        data,
      });
    } catch {
      throw new HttpException(
        {
          error: `A empresa com id ${id} não existe.`,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async delete(id: number): Promise<ICompany> {
    try {
      return await this.prisma.company.delete({
        where: { id },
      });
    } catch {
      throw new HttpException(
        {
          error: `A empresa com id ${id} não existe.`,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async companyExists(createCompanyDTO: CreateCompanyDTO): Promise<boolean> {
    const { name } = createCompanyDTO;

    const companyExists = await this.prisma.company.findFirst({
      where: {
        name,
      },
    });

    return companyExists ? true : false;
  }
}
