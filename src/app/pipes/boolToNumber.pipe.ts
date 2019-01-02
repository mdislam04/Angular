import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateNumber'
})
export class NumberFormate implements PipeTransform {

  transform(value: string, args?: any): string {
    if(args && (args == 'BTC' || args == 'ETH'))
    return Math.round(parseFloat(value)).toString();
    else
   return parseFloat(value).toFixed(5);

  }

}
