export interface IResponse {
  message?: string;
  data?: Object[] | Object;
}

export abstract class CompanyRepository {
  abstract findAll(page: number, items_per_page: number): Promise<IResponse>;

  abstract findOne(id: number): Promise<IResponse>;

  abstract create(
    name: string,
    description: string,
    line_business: string
  ): Promise<IResponse>;

  abstract update(
    id: number,
    name: string,
    description: string,
    line_business: string
  ): Promise<IResponse>;

  abstract delete(id: number): Promise<IResponse>;
}
