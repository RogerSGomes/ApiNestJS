import { Test } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";

// Module
import { AppModule } from "../../app.module";

// Controllers
import { ReadCompanyController } from "./readCompany/read-company.controller";
import { CreateCompanyController } from "./createCompany/create-company.controller";
import { UpdateCompanyController } from "./updateCompany/update-company.controller";
import { DeleteCompanyController } from "./deleteCompany/delete-company.controller";

// DTOS
import { ReadCompanyDTO } from "./readCompany/read-company.dto";
import { CreateCompanyDTO } from "./createCompany/create-company.dto";

// Repositories 'n implementations
import { CompanyRepository } from "../../repositories/company.repository";
import { PrismaCompanyRepository } from "../../repositories/prisma/prisma-company.repository";

// Services
import { PrismaService } from "../../database/prisma.service";

describe("CompanyController", () => {
  let app;
  let readCompanyController: ReadCompanyController;
  let createCompanyController: CreateCompanyController;
  let updateCompanyController: UpdateCompanyController;
  let deleteCompanyController: DeleteCompanyController;
  let prismaService: PrismaService;

  describe("ReadCompanyController", () => {
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [AppModule],
        controllers: [ReadCompanyController],
        providers: [
          PrismaService,
          {
            provide: CompanyRepository,
            useClass: PrismaCompanyRepository,
          },
        ],
      }).compile();

      app = module.createNestApplication();
      app.init();

      readCompanyController = module.get<ReadCompanyController>(
        ReadCompanyController
      );
      prismaService = module.get<PrismaService>(PrismaService);
    });

    it("Should return all companies", async () => {
      const mockObject = [
        {
          id: 1,
          name: "Company 1",
          description: "Description 1",
          line_business: "Line of business 1",
        },
        {
          id: 2,
          name: "Company 2",
          description: "Description 2",
          line_business: "Line of business 2",
        },
      ];

      jest
        .spyOn(prismaService.company, "findMany")
        .mockResolvedValueOnce(mockObject);
      jest
        .spyOn(prismaService.company, "count")
        .mockResolvedValueOnce(mockObject.length);

      const result = await readCompanyController.getCompanies(null, 1, 20);

      expect(result).toHaveProperty("data");
      expect(result.data).toHaveProperty("companies");
      expect(result.data).toHaveProperty("total");
    });

    it("Should return a company", async () => {
      const mockedObject = {
        id: 1,
        name: "Teste",
        description: "Teste de testar",
        line_business: "Testadora",
        users: [
          {
            id: 1,
            name: "Testador",
            company_id: 1,
          },
        ],
      };

      jest.spyOn(prismaService.company, "count").mockResolvedValueOnce(1);
      jest
        .spyOn(prismaService.company, "findFirstOrThrow")
        .mockResolvedValueOnce(mockedObject);

      const result = await readCompanyController.getCompanies(1, null, null);
      expect(result).toHaveProperty("data");
      expect(result.data).toHaveProperty("id");
      expect(result.data).toHaveProperty("name");
      expect(result.data).toHaveProperty("description");
      expect(result.data).toHaveProperty("description");
      expect(result.data).toHaveProperty("users");
    });

    // it("Should return a bad_request error for parameters page 'n items_per_page", async () => {
    //   const response = await request(app.getHttpServer())
    //     .get("/company/abcdef")
    //     .expect(400);

    //   expect(response.body).toHaveProperty("error");
    //   expect(response.body.error).toEqual(
    //     "Os parâmetros 'page' e 'items_per_page' são obrigatórios e devem ser números maiores que 1."
    //   );
    // });

    // it("Should return a not_found error", async () => {
    //   const response = await request(app.getHttpServer())
    //     .get("/company/100000")
    //     .expect(404);

    //   expect(response.body).toHaveProperty("error");
    //   expect(response.body.error).toEqual(
    //     "A empresa com ID 100000 não existe."
    //   );
    // });

    // it("Should return a not_found error for requested page", async () => {
    //   const response = await request(app.getHttpServer())
    //     .get("/company?page=10000&items_per_page=1")
    //     .expect(404);

    //   expect(response.body).toHaveProperty("error");
    //   expect(response.body.error).toEqual(
    //     "Não existe nenhuma empresa nesta página"
    //   );
    // });
  });

  describe("CreateCompanyController", () => {
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [AppModule],
        controllers: [CreateCompanyController],
        providers: [
          PrismaService,
          {
            provide: CompanyRepository,
            useClass: PrismaCompanyRepository,
          },
        ],
      }).compile();

      app = module.createNestApplication();
      app.init();

      createCompanyController = module.get<CreateCompanyController>(
        CreateCompanyController
      );
      prismaService = module.get<PrismaService>(PrismaService);
    });

    it("Should create a company", async () => {
      const DTO: CreateCompanyDTO = {
        name: "Teste",
        description: "Teste de testar mesmo",
        line_business: "testadora",
      };

      jest
        .spyOn(prismaService.company, "findFirst")
        .mockResolvedValueOnce(null);
      jest
        .spyOn(prismaService.company, "create")
        .mockResolvedValueOnce({ id: 1, ...DTO });

      expect(await createCompanyController.createCompany(DTO)).toEqual({
        message: "Empresa criada com sucesso.",
      });
    });

    it("Should return a conflict error", async () => {
      const DTO: CreateCompanyDTO = {
        name: "Teste",
        description: "Teste de testar mesmo",
        line_business: "testadora",
      };

      jest
        .spyOn(prismaService.company, "findFirst")
        .mockResolvedValueOnce({ id: 1, ...DTO });

      const result = async () =>
        await createCompanyController.createCompany(DTO);

      expect(result()).rejects.toThrowError(HttpException);
    });
  });
});
