interface IUser {
  id: number;
  name: string;
  company_id: number;
  company?: ICompany;
}
