import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paidUnpaid'
})
export class PaidUnpaidPipe implements PipeTransform {

  transform(value: boolean): string {
    return value?'Paid':'Unpaid';
  }

}
