import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSpacer'
})
export class CustomSpacerPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return value.split('').join(' ');
    }
    return value;
  }

}
