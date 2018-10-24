import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateNumber'
})
export class NumberFormate implements PipeTransform {

  transform(value: string, args?: any): string {
   return parseFloat(value).toFixed(5);

  }

}
