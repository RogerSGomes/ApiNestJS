interface ICompany {
  id: number;
  name: string;
  description: string;
  line_business: string;
  users?: IUser[];
}
