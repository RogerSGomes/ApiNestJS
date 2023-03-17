export abstract class UserRepository {
  abstract create(name: string, company_id: number): Promise<Object>;
}
