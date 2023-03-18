export interface IResponse {
  message?: string;
  data?: Object[] | Object;
}

export abstract class UserRepository {
  abstract create(name: string, company_id: number): Promise<IResponse>;
}
