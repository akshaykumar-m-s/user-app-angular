import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "wordcase" })
export class WordCasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value
      .replace(/^[a-z]/g, (char) => ` ${char.toUpperCase()}`)
      .replace(/[A-Z]|[0-9]+/g, " $&")
      .replace(/\s+/, (char) => "");
  }
}
