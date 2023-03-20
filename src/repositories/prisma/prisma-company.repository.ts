import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { PrismaService } from "src/database/prisma.service";
import { CompanyRepository, IResponse } from "../company.repository";

// DTOS
import { UpdateCompanyDTO } from "src/useCases/company/updateCompany/update-company.dto";

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca todas as empresas cadastradas no banco de dados.
   * @param {number} page - Número da página a ser buscada.
   * @param {number} items_per_page - Quantidade de empresas a serem retornadas por página.
   * @returns {Promise<IResponse>} - Retorna um objeto IResponse contendo as empresas e o total de empresas cadastradas.
   * @throws {HttpException} - Retorna um erro HttpException se a página não contém empresas, se não há empresas cadastradas ou se os parâmetros passados não são válidos.
   */
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
    }

    const companyAmount = await this.companyAmount();
    if (companyAmount == 0) {
      throw new HttpException(
        { error: "Não existe nenhuma empresa cadastrada." },
        HttpStatus.NOT_FOUND
      );
    }

    const companies = await this.prisma.company.findMany({
      skip: (page - 1) * items_per_page,
      take: items_per_page,
      orderBy: { id: "asc" },
    });

    if (companies.length === 0) {
      throw new HttpException(
        { error: "Esta página não contém empresas." },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      data: {
        companies,
        total: companyAmount,
      },
    };
  }

  /**
   * Busca uma empresa pelo seu id e retorna uma resposta contendo os dados da empresa ou
   * uma mensagem de erro caso a empresa não seja encontrada.
   *
   * @param {number} id - id da empresa a ser buscada.
   * @returns {Promise<IResponse>} - Uma resposta contendo os dados da empresa ou uma mensagem de sucesso.
   * @throws {HttpException} - Caso o id não for um número maior que 1.
   * @throws {HttpException} - Caso a empresa não for encontrada.
   */
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

    if ((await this.companyAmount()) === 0) {
      throw new HttpException(
        { error: "Não existe nenhuma empresa cadastrada." },
        HttpStatus.NOT_FOUND
      );
    }

    try {
      const company = await this.prisma.company.findFirstOrThrow({
        where: { id },
        include: { users: true },
      });

      return { data: company };
    } catch {
      throw new HttpException(
        { error: `A empresa com ID ${id} não existe.` },
        HttpStatus.NOT_FOUND
      );
    }
  }

  /**
   * Cria uma nova empresa no banco de dados
   * @param {string} name - Nome da empresa
   * @param {string} description - Descrição da empresa
   * @param {string} line_business - Área de atuação da empresa
   * @returns {Promise<IResponse>} - Resposta da requisição contendo uma mensagem de sucesso ou erro
   * @throws {HttpException} - Exceção HTTP 400 caso os campos obrigatórios não sejam informados ou exceção HTTP 409 caso a empresa já exista
   */
  async create(
    name: string,
    description: string,
    line_business: string
  ): Promise<IResponse> {
    if (!name || !description || !line_business) {
      throw new HttpException(
        {
          error:
            "Os campos 'name', 'description' e 'line_business' são obrigatórios.",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const companyAlreadyExists = await this.prisma.company.findFirst({
      where: { name, description },
    });

    if (companyAlreadyExists) {
      throw new HttpException(
        { error: "Esta empresa já existe." },
        HttpStatus.CONFLICT
      );
    }

    await this.prisma.company.create({
      data: {
        name: name,
        description: description,
        line_business: line_business,
      },
    });

    return { message: "Empresa criada com sucesso" };
  }

  async update(
    id: number,
    name?: string,
    description?: string,
    line_business?: string
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

    // Verifica se a empresa existe.
    try {
      await this.prisma.company.findFirstOrThrow({
        where: { id },
      });
    } catch {
      throw new HttpException(
        { error: `A empresa com ID ${id} não foi encontrada.` },
        HttpStatus.NOT_FOUND
      );
    }

    // Verifica pelo menos um dos parâmetros de atualização foram fornecidos.
    if (!name && !description && !line_business) {
      throw new HttpException(
        { error: "Forneça o que deseja atualizar das informações da empresa." },
        HttpStatus.BAD_REQUEST
      );
    }

    const data: UpdateCompanyDTO = {
      name: name ?? undefined,
      description: description ?? undefined,
      line_business: line_business ?? undefined,
    };

    await this.prisma.company.update({
      where: { id },
      data,
    });

    return { message: "Empresa atualizada com sucesso." };
  }

  async delete(id: number): Promise<IResponse> {
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
      await this.prisma.company.findFirstOrThrow({
        where: { id },
      });
    } catch {
      throw new HttpException(
        { error: `A empresa com ID ${id} não existe.` },
        HttpStatus.NOT_FOUND
      );
    }

    await this.prisma.company.delete({
      where: { id },
    });

    if ((await this.companyAmount()) === 0) {
      // Reinicia o AUTO_INCREMENT das tabelas company e user para 1
      await this.prisma.$executeRaw`ALTER TABLE company AUTO_INCREMENT = 1;`;
      await this.prisma.$executeRaw`ALTER TABLE user AUTO_INCREMENT = 1;`;
    }

    return { message: "Empresa deletada com sucesso." };
  }

  private async companyAmount() {
    return await this.prisma.company.count();
  }
}
