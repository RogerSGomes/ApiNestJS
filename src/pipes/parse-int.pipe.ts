import { PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    return val;
  }
}
