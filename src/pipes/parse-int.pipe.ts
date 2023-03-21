import { PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    return parseInt(value, 10);
  }
}
