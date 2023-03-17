import { Module } from "@nestjs/common";

// Controllers
import { CreateCompanyController } from "./useCases/createCompany/create-company.controller";
import { CreateUserController } from "./useCases/createUser/create-user.controller";

// Providers
import { PrismaService } from "./database/prisma.service";

@Module({
  imports: [],
  controllers: [CreateUserController, CreateCompanyController],
  providers: [PrismaService],
})
export class AppModule {}
