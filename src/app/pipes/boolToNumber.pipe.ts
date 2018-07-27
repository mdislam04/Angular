import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToNum'
})
export class BoolToNumberPipe implements PipeTransform {

  transform(value: number, args?: any): boolean {
    if (value.toString() === "1") {
      return true;
    } else {
      return false;
    }

  }

}
