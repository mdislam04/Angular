import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateNumber'
})
export class NumberFormate implements PipeTransform {

  transform(value: string, args?: any, args1?: any): string {
    if (!value)
      return;
    if (args1 && args1 == true)
      return value;
    else if (args && (args == 'BTC' || args == 'ETH'))
      return Math.round(parseFloat(value)).toString();
    else
      return parseFloat(value).toFixed(5);

  }

}
