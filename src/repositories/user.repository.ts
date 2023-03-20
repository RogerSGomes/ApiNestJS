export interface IResponse {
  message?: string;
  data?: Object[] | Object;
}

export abstract class UserRepository {
  abstract findAll(page: number, items_per_page: number): Promise<IResponse>;

  abstract findOne(id: number): Promise<IResponse>;

  abstract create(name: string, company_id: number): Promise<IResponse>;

  abstract update(
    id: number,
    name?: string,
    company_id?: number
  ): Promise<IResponse>;

  abstract delete(id: number): Promise<IResponse>;
}
