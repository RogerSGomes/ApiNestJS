import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty({
    message: "name field should not be empty.",
  })
  @Length(5, 100, {
    message: "name field must have more than 5 and less than 100 characters.",
  })
  name: String;

  @IsNotEmpty({
    message: "company_id field should not be empty.",
  })
  company_id: Number;
}
