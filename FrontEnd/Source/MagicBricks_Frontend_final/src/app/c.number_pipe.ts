import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidenumberpipe'
})
export class hidenumberpipe implements PipeTransform {
  transform(mobileNumber: string): string {
    const maskedNumber = mobileNumber.slice(0, -5) + '*****';
    return maskedNumber;
  }
}
