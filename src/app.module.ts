import { Module } from "@nestjs/common";

// Global Providers
import { PrismaService } from "./database/prisma.service";

// Company Controllers
import { ReadCompanyController } from "./useCases/company/readCompany/read-company.controller";
import { CreateCompanyController } from "./useCases/company/createCompany/create-company.controller";
import { UpdateCompanyController } from "./useCases/company/updateCompany/update-company.controller";
import { DeleteCompanyController } from "./useCases/company/deleteCompany/delete-company.controller";

// Company Providers
import { CompanyRepository } from "./repositories/company.repository";
import { PrismaCompanyRepository } from "./repositories/prisma/prisma-company.repository";

// User Controllers
import { CreateUserController } from "./useCases/user/createUser/create-user.controller";

// User Providers
import { UserRepository } from "./repositories/user.repository";
import { PrismaUserRepository } from "./repositories/prisma/prisma-user.repository";

@Module({
  imports: [],
  controllers: [
    ReadCompanyController,
    CreateCompanyController,
    UpdateCompanyController,
    DeleteCompanyController,
    CreateUserController,
  ],
  providers: [
    PrismaService,
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule {}
