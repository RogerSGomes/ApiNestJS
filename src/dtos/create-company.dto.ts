import { IsNotEmpty, Length } from "class-validator";

export class CreateCompanyDTO {
  @IsNotEmpty({
    message: "name field should not be empty.",
  })
  @Length(5, 100, {
    message: "name field must have more than 5 and less than 100 characters.",
  })
  name: String;
}
